from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Project,
    ScriptVersion,
    Scene,
    Thumbnail
)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = '__all__'


class ThumbnailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thumbnail
        fields = '__all__'


class ScriptVersionSerializer(serializers.ModelSerializer):

    scenes = SceneSerializer(many=True, read_only=True)

    thumbnails = ThumbnailSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = ScriptVersion

        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):

    versions = ScriptVersionSerializer(
        many=True,
        read_only=True
    )

    collection_id = serializers.CharField(
        required=False, 
        allow_null=True
    )

    class Meta:
        model = Project
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


# serializers.py – add these classes

class DashboardProjectSerializer(serializers.ModelSerializer):
    """Minimal project data for dashboard recent list"""
    latest_thumbnail = serializers.SerializerMethodField()
    script_count = serializers.IntegerField(source='versions.count', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'topic', 'platform', 'created_at', 'updated_at', 'latest_thumbnail', 'script_count']

    def get_latest_thumbnail(self, obj):
        latest_version = obj.versions.order_by('-created_at').first()
        if latest_version and latest_version.thumbnails.exists():
            return latest_version.thumbnails.first().image_url
        return None


class DashboardStatsSerializer(serializers.Serializer):
    total_scripts = serializers.IntegerField()
    visual_generated = serializers.IntegerField()
    recent_projects = DashboardProjectSerializer(many=True)