from django.contrib import admin
from .models import *

# Register your models here.
# admin.site.register(OurUserManager)
admin.site.register(OurUsers)
admin.site.register(Forms)
admin.site.register(Sections)
admin.site.register(Questions)
admin.site.register(Options)
admin.site.register(Dropdown)
admin.site.register(Responses)
admin.site.register(ShortPara)
admin.site.register(FileUpload)

