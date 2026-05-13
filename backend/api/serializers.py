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