from django.db import models

class Task(models.Model):
    id = models.IntegerField
    task_id = models.CharField(max_length=8)
    task_description = models.TextField(max_length=255)
    task_deadline = models.TextField(max_length=32)
    task_priority = models.IntegerField
    task_status = models.IntegerField
    is_active = models.IntegerField

