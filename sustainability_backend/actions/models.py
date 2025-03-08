from django.db import models

class Action(models.Model):
    action = models.CharField(max_length=255)
    date = models.DateField()
    points = models.IntegerField()
    
    def __str__(self):
        return f"{self.action} - {self.date}"