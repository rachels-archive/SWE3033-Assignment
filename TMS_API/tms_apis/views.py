from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from tms_apis.models import Task
from tms_apis.serializers import TaskSerializer


class TaskView(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

