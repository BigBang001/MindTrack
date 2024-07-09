from django.db import models

class Survey(models.Model):
    mood = models.CharField(max_length=100)
    symptoms = models.TextField()
    weight = models.FloatField()
    hours_of_sleep = models.FloatField()
    thoughts = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Survey - {self.created_at}"
