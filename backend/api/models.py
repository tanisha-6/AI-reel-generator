from django.db import models
from django.contrib.auth.models import User


# =========================================
# PROJECT MODEL
# =========================================

class Project(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='projects'
    )

    name = models.CharField(
        max_length=255
    )

    topic = models.TextField()

    niche = models.CharField(
        max_length=100
    )

    platform = models.CharField(
        max_length=100
    )

    content_style = models.CharField(
        max_length=100
    )

    folder_name = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    is_favorite = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


# =========================================
# SCRIPT VERSION MODEL
# =========================================

class ScriptVersion(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='versions'
    )

    version_number = models.IntegerField(
        default=1
    )

    title = models.CharField(
        max_length=255
    )

    hook = models.TextField()

    main_script = models.TextField()

    cta = models.TextField()

    hashtags = models.TextField()

    viral_score = models.IntegerField(
        default=0
    )

    ai_model = models.CharField(
        max_length=100,
        default='gemini'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.project.name} - V{self.version_number}"


# =========================================
# SCENE MODEL
# =========================================

class Scene(models.Model):

    script_version = models.ForeignKey(
        ScriptVersion,
        on_delete=models.CASCADE,
        related_name='scenes'
    )

    scene_order = models.IntegerField()

    timestamp = models.CharField(
        max_length=50
    )

    visual = models.TextField()

    narrative = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['scene_order']

    def __str__(self):
        return f"Scene {self.scene_order}"


# =========================================
# THUMBNAIL MODEL
# =========================================

class Thumbnail(models.Model):

    script_version = models.ForeignKey(
        ScriptVersion,
        on_delete=models.CASCADE,
        related_name='thumbnails'
    )

    label = models.CharField(
        max_length=255
    )

    image_url = models.URLField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.label