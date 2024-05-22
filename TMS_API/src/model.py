from django.db import models


class Task(models.Model):
    id = models.IntegerField(primary_key=True, editable=False, unique=True)
    task_id = models.CharField(max_length=8, null=False, unique=True)
    task_name = models.CharField(max_length=128, null=False)
    task_description = models.TextField(max_length=255, null=True)
    task_deadline = models.TextField(max_length=32, null=True)
    task_priority = models.IntegerField(null=False)
    task_status = models.IntegerField(null=False)
    is_active = models.IntegerField(null=False)

    class Meta:
        db_table = 'Task'
