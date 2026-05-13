from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.db.models import Sum, Count
from .serializers import DashboardStatsSerializer, DashboardProjectSerializer

from .serializers import (
    RegisterSerializer,
    ScriptVersionSerializer,
    UserSerializer,
    ProjectSerializer
)
from .models import (
    Project,
    ScriptVersion,
    Scene,
    Thumbnail
)

from .services.gemini_service import generate_ai_script
from .services.thumbnail_service import generate_thumbnail_variations


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_script(request):

    ai_response = generate_ai_script(request.data)

    collection_id = request.data.get("collectionId")   # frontend sends "collectionId"

    project, created = Project.objects.get_or_create(
        user=request.user,
        name=request.data.get("topic"),
        defaults={
            "topic": request.data.get("topic"),
            "niche": request.data.get("niche"),
            "platform": request.data.get("platform"),
            "content_style": request.data.get("content_style"),
            "collection_id": collection_id,   # <-- add this
        }
    )

    # If project already existed but collection_id is missing/needs update, optionally update it
    if not created and collection_id:
        project.collection_id = collection_id
        project.save(update_fields=['collection_id'])

    script = ScriptVersion.objects.create(

        project=project,

        version_number=1,

        title=ai_response.get("title"),

        hook=ai_response.get("hook"),

        main_script=ai_response.get("script"),

        cta=ai_response.get("cta"),

        hashtags=", ".join(
            ai_response.get("hashtags", [])
        ),

        viral_score=85,

        ai_model="openrouter",
    )

    scenes = ai_response.get("scenes", [])

    for index, scene in enumerate(scenes, start=1):

        Scene.objects.create(

            script_version=script,

            scene_order=index,

            timestamp=f"0:{index*5:02}",

            visual=scene.get(
                "scene_description",
                ""
            ),

            narrative=scene.get(
                "scene_title",
                ""
            ),
        )


    thumbnail_results = generate_thumbnail_variations(
        request.data.get("topic"),
        ai_response.get("title")
    )

    for thumb in thumbnail_results:

        Thumbnail.objects.create(
            script_version=script,
            label=thumb["label"],
            image_url=thumb["image_url"]
        )


    serializer = ScriptVersionSerializer(script)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):

    serializer = UserSerializer(request.user)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])

def get_projects(request):

    projects = Project.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = ProjectSerializer(
        projects,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])

def dashboard_stats(request):

    user = request.user

    total_scripts = Project.objects.filter(
        user=user
    ).count()

    visual_generated = Thumbnail.objects.filter(
        script_version__project__user=user
    ).count()

    recent_projects = Project.objects.filter(
        user=user
    ).order_by('-created_at')[:5]

    data = {
        'total_scripts': total_scripts,
        'visual_generated': visual_generated,
        'recent_projects': DashboardProjectSerializer(
            recent_projects,
            many=True
        ).data
    }

    return Response(data)