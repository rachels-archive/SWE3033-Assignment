from rest_framework import serializers

from tms_apis.models import Task

class TaskSerializer(serializers.ModelSerializer):
    task_id = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [ 'id','task_name', 'task_description', 'task_deadline', 'task_priority', 'task_status', 'task_id', 'is_active']

    def get_task_id(self, obj):
        return f"T_{obj.id}"
