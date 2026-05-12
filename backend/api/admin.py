from django.contrib import admin
from .models import (
    Project,
    ScriptVersion,
    Scene,
    Thumbnail
)


class SceneInline(admin.TabularInline):
    model = Scene
    extra = 1


class ThumbnailInline(admin.TabularInline):
    model = Thumbnail
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'user',
        'platform',
        'niche',
        'created_at',
    )

    search_fields = (
        'name',
        'topic',
        'niche',
    )


@admin.register(ScriptVersion)
class ScriptVersionAdmin(admin.ModelAdmin):

    list_display = (
        'project',
        'version_number',
        'viral_score',
        'created_at',
    )

    inlines = [
        SceneInline,
        ThumbnailInline
    ]


@admin.register(Scene)
class SceneAdmin(admin.ModelAdmin):

    list_display = (
        'scene_order',
        'timestamp',
        'script_version',
    )


@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):

    list_display = (
        'label',
        'script_version',
        'created_at',
    )