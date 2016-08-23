#coding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
from django.db import models

# Create your models here.

class User(models.Model):
    real_name=models.CharField(max_length=140,default='')
    student_no=models.CharField(max_length=140,default='')
    school=models.CharField(max_length=140,default='')
    #nick name
    username=models.CharField(max_length=140,default='' , primary_key=True)
    password=models.CharField(max_length=140,default='')
    phone=models.CharField(max_length=140,default='')
    #头像
    avatar=models.CharField(max_length=140,default='')
    #qq
    qq_number=models.CharField(max_length=140,default='')
    #是否注册过 0 no  1 yes
    is_register=models.IntegerField(default=0)

    def __unicode__(self):
        return 'User'


class UserCollection(models.Model):
    userName=models.CharField(max_length=140,default='')
    barterSha1=models.CharField(max_length=140,default='')

    class Meta:
        unique_together=('userName','barterSha1')

class Barter(models.Model):
    time=models.CharField(max_length=140,default='')
    sha1=models.CharField(max_length=140,default='',primary_key=True)
    userName=models.CharField(max_length=140,default='')
    description=models.TextField()
    category=models.CharField(max_length=140,default='')
    title=models.CharField(max_length=140,default='')


class BarterImage(models.Model):
    barterSha1=models.CharField(max_length=140)
    imageName=models.CharField(max_length=140 , primary_key=True)


class appSession(models.Model):
    sessionid=models.CharField(max_length=140,default='')
    userName=models.CharField(max_length=140,default='')