from django.db import models


class Recipe(models.Model):
    title      = models.CharField(max_length=50)
    body       = models.TextField(blank=False)
    #Keywords  = models.CharField(max_length=100)
    #thumbnail = models.ImageField()
    #images    = models.ImageField(upload_to='media', null=False, blank=False)
    #author    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='blog', on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    read_time = models.IntegerField()
    #Yumms = models.IntergerField()
    #slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['published_on']

    # def save(self, *args, **kwargs):
    #     super(Recipe, self).save(*args, **kwargs)




