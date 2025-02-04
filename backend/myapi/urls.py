from django.urls import path
from . import views

#URL_CONFIG
urlpatterns=[
    path('hello/',views.say_hello),
    path('match_info/',views.get_match_info)

]
