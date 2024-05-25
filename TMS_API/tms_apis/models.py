from django.db import models
import uuid

class Task(models.Model):
    id = models.AutoField(primary_key=True, editable=False, unique=True)
    task_id = models.CharField(max_length=8, null=False, unique=True, default=lambda: f"T_{uuid.uuid4().hex[:6].upper()}")
    task_name = models.CharField(max_length=128, null=False)
    task_description = models.TextField(max_length=255, null=True, blank=True)
    task_deadline = models.TextField(max_length=32, null=True)
    task_priority = models.IntegerField(null=False)
    task_status = models.IntegerField(null=False)
    is_active = models.IntegerField(null=False)

    class Meta:
        db_table = 'Task'

    def __str__(self):
        return self.task_id