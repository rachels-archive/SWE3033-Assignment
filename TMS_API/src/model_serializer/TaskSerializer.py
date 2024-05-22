from rest_framework import serializers

from src.model import Task


class TaskSerializer(serializers.ModelSerializer):
    model = Task
    fields = ['id', 'task_id', 'task_description', 'task_deadline', 'task_priority', 'task_status','is_active']
