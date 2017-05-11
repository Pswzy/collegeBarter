#encoding=utf-8
import sys
reload(sys)
sys.setdefaultencoding("utf8")
import json,base64
import pdb
from django.shortcuts import render
from django.http import HttpResponse
from CollegeBarter.college_barter.models import *
from django.contrib.sessions.models import Session
from django.conf import settings
from django.core.management import call_command
import pdb,os,hashlib,time,hashlib,logging,urllib2,StringIO
from django.forms.models import model_to_dict
from PIL import Image
from django.core.files.base import ContentFile
from django.shortcuts import render_to_response
from django.db import connection


def android_request(request):
    connection.cursor()
    connection.connection.text_factory = str
    rsdic={'ret':1101,'info':'OK'}
    data=request.POST['data']
    data=data.replace("\n","\\n").replace("\r","\\r")
    command=json.loads(data)
    type=command['type']
    if type=='login':
        try:
            username=command['username']
            password=command['password']
            passwd_sha=hashlib.sha1(password).hexdigest()
            try:
                user=User.objects.get(username=username,password=passwd_sha)
            except Exception,e:
                rsdic={'ret':1104,'info':'User does not exist'+str(e)}
                response =  HttpResponse(json.dumps(rsdic))
                return
            if user.is_register==0:
                rsdic={'ret':1105,'info':'User does not register'}
                return

            sessionid=request.session.session_key
            if sessionid==None:
                request.session.save()
                sessionid=request.session.session_key
            session_obj=appSession(sessionid=sessionid,userName=username)
            session_obj.save()
            request.session['username']=username
            request.session['sessionid']=sessionid
            request.session['heading']=user.avatar
            rsdic['sessionid']=sessionid
            rsdic['headimg']=user.avatar
            rsdic['username']=username
            response=HttpResponse(json.dumps(rsdic))
            response.set_cookie('username',username,max_age=24*60*60)
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            response=HttpResponse(json.dumps(rsdic))
            print str(e)
            return
        finally:
            return response

    elif type=='user-register':
        try:
            sno=command['sno']
            school=command['school']
            users=User.objects.filter(student_no=sno,school=school)
            if len(users)==0:
                #user = User.objects.filter(student_no=sno)
                #if not len(user) or user[0].school.decode('gkb') != school:
                    rsdic={'info':'User does not exist','ret':1104}
                    return
            elif users[0].is_register==1:
                rsdic={'info':'is_registered','ret':1101}
                return
            user=users[0]
            passwd=command['password']
            #user.usersha1=hashlib.sha1(command['userName']).hexdigest()
            user.password=hashlib.sha1(passwd).hexdigest()
            user.qq_number=command['qq']
            user.phone=command['mobile']
            user.username=command['userName']
            user.is_register=1
            user.save()
            return
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='get-user-info':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            username=command['user_name']
            try:
                user=User.objects.get(username=username)
            except:
                rsdic={'ret':1104,'info':'User does not exist'}
                return
            user_info={}
            user_info['realname']=user.real_name
            user_info['username']=user.username
            user_info['school']=user.school
            user_info['mobile']=user.phone
            user_info['qq']=user.qq_number
            user_info['headimg']=user.avatar
            rsdic['data']=user_info
            return
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='create-barter':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            username=command['userName']
            title=command['title']
            description=command['description']
            category=command['category']
            barter_sha1=hashlib.sha1(title+str(time.time())).hexdigest()
            now_time=time.strftime('%Y-%m-%d %H:%M')
            saleState = 0
            barter=Barter(sha1=barter_sha1,description=description,category=category,userName=username,time=now_time,title=title,saleState=saleState)
            barter.save()
            rsdic['barterSha1']=barter_sha1
            rsdic['userName']=username
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='recent-barters':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            start=int(command['recent-start'])
            end=int(command['recent-end'])
            username=request.session['username']
            barters=Barter.objects.order_by('-time')[start:end]
            barter_list=[]
            for barter in barters:
                dic={}
                dic['barterSha1']=barter.sha1
                dic['creatorName']=barter.userName
                dic['category']=barter.category
                dic['content']=barter.description
                dic['creatorName']=barter.userName
                dic['title']=barter.title
                dic['time']=barter.time
                dic['saleState']=barter.saleState
                is_collect=UserCollection.objects.filter(userName=username,barterSha1=barter.sha1)
                if len(is_collect)==0:
                    dic['is_collected']=0
                else:
                    dic['is_collected']=1
                try:
                    user=User.objects.get(username=barter.userName)
                except:
                    rsdic={'ret':'1105','info':'User does not exists'}
                    return
                if user.avatar=='':
                    dic['headimg']=''
                else:
                    dic['headimg']=user.avatar
                images=BarterImage.objects.filter(barterSha1=barter.sha1)
                if len(images)>=4:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=images[3].imageName
                elif len(images)==3:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=''
                elif len(images)==2:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                elif len(images)==1:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                else :
                    dic['image_one_sha1']=''
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                barter_list.append(dic)
            rsdic['data']=barter_list
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='collected-barters':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            if command.has_key('recent-start') and command.has_key('recent-end'):
                start=int(command['recent-start'])
                end=int(command['recent-end'])
            else:
                start=None
                end=None
            username=request.session['username']
            if start==None and end==None:
                userCollected=UserCollection.objects.filter(userName=username)
            else:
                userCollected=UserCollection.objects.filter(userName=username)[start:end]
            barter_list=[]
            for collect in userCollected:
                barterSha1=collect.barterSha1
                barter=Barter.objects.get(sha1=barterSha1)
                dic={}
                dic['barterSha1']=barterSha1
                dic['creatorName']=barter.userName
                dic['category']=barter.category
                dic['content']=barter.description
                dic['creatorName']=barter.userName
                dic['is_collected']=1
                dic['title']=barter.title
                dic['time']=barter.time
                dic['saleState']=barter.saleState
                try:
                    user=User.objects.get(username=barter.userName)
                except:
                    rsdic={'ret':'1105','info':'User does not exists'}
                    return
                if user.avatar=='':
                    dic['headimg']=''
                else:
                    dic['headimg']=user.avatar
                images=BarterImage.objects.filter(barterSha1=barter.sha1)
                if len(images)>=4:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=images[3].imageName
                elif len(images)==3:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=''
                elif len(images)==2:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                elif len(images)==1:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                else :
                    dic['image_one_sha1']=''
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                barter_list.append(dic)
            barter_list=sorted(barter_list , key=lambda k : k['time'] , reverse=True)
            rsdic['data']=barter_list
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='get-my-barters':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            if command.has_key('recent-start') and command.has_key('recent-end'):
                start=int(command['recent-start'])
                end=int(command['recent-end'])
            else:
                start=None
                end=None
            username=request.session['username']
            if start==None and end==None:
                barters=Barter.objects.filter(userName=username)
            else:
                barters=Barter.objects.filter(userName=username).order_by('-time')[start:end]
            barter_list=[]
            for barter in barters:
                dic={}
                dic['barterSha1']=barter.sha1
                dic['creatorName']=barter.userName
                dic['category']=barter.category
                dic['content']=barter.description
                dic['creatorName']=barter.userName
                dic['title']=barter.title
                dic['time']=barter.time
                dic['saleState']=barter.saleState
                try:
                    user=User.objects.get(username=barter.userName)
                except:
                    rsdic={'ret':'1105','info':'User does not exists'}
                    return
                if user.avatar=='':
                    dic['headimg']=''
                else:
                    dic['headimg']=user.avatar
                is_collect=UserCollection.objects.filter(userName=username,barterSha1=barter.sha1)
                if len(is_collect)==0:
                    dic['is_collected']=0
                else:
                    dic['is_collected']=1
                images=BarterImage.objects.filter(barterSha1=barter.sha1)
                if len(images)>=4:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=images[3].imageName
                elif len(images)==3:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=''
                elif len(images)==2:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                elif len(images)==1:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                else :
                    dic['image_one_sha1']=''
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                barter_list.append(dic)
            #barter_list=sorted(barter_list , key=lambda k : k['time'] , reverse=True)
            rsdic['data']=barter_list
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='get-barter-info':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            barterSha1=command['barterSha1']
            username=request.session['username']
            barter=Barter.objects.get(sha1=barterSha1)
            dic={}
            dic['barterSha1']=barter.sha1
            dic['creatorName']=barter.userName
            dic['category']=barter.category
            dic['content']=barter.description
            dic['title']=barter.title
            dic['time']=barter.time
            dic['saleState']=barter.saleState
            try:
                user=User.objects.get(username=barter.userName)
            except:
                rsdic={'ret':'1105','info':'User does not exists'}
                return
            if user.avatar=='':
                dic['headimg']=''
            else:
                dic['headimg']=user.avatar
            is_collect=UserCollection.objects.filter(userName=username,barterSha1=barter.sha1)
            if len(is_collect)==0:
                dic['is_collected']=0
            else:
                dic['is_collected']=1
            images=BarterImage.objects.filter(barterSha1=barter.sha1)
            if len(images)>=4:
                dic['image_one_sha1']=images[0].imageName
                dic['image_two_sha1']=images[1].imageName
                dic['image_three_sha1']=images[2].imageName
                dic['image_four_sha1']=images[3].imageName
            elif len(images)==3:
                dic['image_one_sha1']=images[0].imageName
                dic['image_two_sha1']=images[1].imageName
                dic['image_three_sha1']=images[2].imageName
                dic['image_four_sha1']=''
            elif len(images)==2:
                dic['image_one_sha1']=images[0].imageName
                dic['image_two_sha1']=images[1].imageName
                dic['image_three_sha1']=''
                dic['image_four_sha1']=''
            elif len(images)==1:
                dic['image_one_sha1']=images[0].imageName
                dic['image_two_sha1']=''
                dic['image_three_sha1']=''
                dic['image_four_sha1']=''
            else :
                dic['image_one_sha1']=''
                dic['image_two_sha1']=''
                dic['image_three_sha1']=''
                dic['image_four_sha1']=''
            rsdic['data']=dic
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='get-barters-by-category':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            category=command['category']
            username=request.session['username']
            if command.has_key('recent-start') and command.has_key('recent-end'):
                start=int(command['recent-start'])
                end=int(command['recent-end'])
            else:
                start=None
                end=None
            if start==None and end==None:
                barters=Barter.objects.filter(category=category)
            else:
                barters=Barter.objects.filter(category=category).order_by('-time')[start:end]
            barter_list=[]
            for barter in barters:
                dic={}
                dic['barterSha1']=barter.sha1
                dic['creatorName']=barter.userName
                dic['category']=barter.category
                dic['content']=barter.description
                dic['creatorName']=barter.userName
                dic['title']=barter.title
                dic['time']=barter.time
                dic['saleState']=barter.saleState
                try:
                    user=User.objects.get(username=barter.userName)
                except:
                    rsdic={'ret':'1105','info':'User does not exists'}
                    return
                if user.avatar=='':
                    dic['headimg']=''
                else:
                    dic['headimg']=user.avatar
                is_collect=UserCollection.objects.filter(userName=username,barterSha1=barter.sha1)
                if len(is_collect)==0:
                    dic['is_collected']=0
                else:
                    dic['is_collected']=1
                images=BarterImage.objects.filter(barterSha1=barter.sha1)
                if len(images)>=4:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=images[3].imageName
                elif len(images)==3:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=images[2].imageName
                    dic['image_four_sha1']=''
                elif len(images)==2:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=images[1].imageName
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                elif len(images)==1:
                    dic['image_one_sha1']=images[0].imageName
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                else :
                    dic['image_one_sha1']=''
                    dic['image_two_sha1']=''
                    dic['image_three_sha1']=''
                    dic['image_four_sha1']=''
                barter_list.append(dic)
            barter_list=sorted(barter_list , key=lambda k : k['time'] , reverse=True)
            rsdic['data']=barter_list
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='collect-barter':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            username=command['userName']
            barterSha1=command['barterSha1']
            try:
                UserCollection(userName=username,barterSha1=barterSha1).save()
            except :
                rsdic={'ret':'1105','info':"你已经收藏过"}
                return
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=='uncollect-barter':
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            username=command['userName']
            barterSha1=command['barterSha1']
            try:
                usercollect=UserCollection.objects.get(userName=username,barterSha1=barterSha1)
            except:
                rsdic={'ret':'1105','info':'Collect do not exist'}
                return
            usercollect.delete()
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=="delete-barter":
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            barterSha1=command['barterSha1']
            try:
                barter=Barter.objects.get(sha1=barterSha1)
            except:
                rsdic={'ret':'1105','info':'Barter does not exists'}
                return
            barter.delete()
            userCollections=UserCollection.objects.filter(barterSha1=barterSha1)
            userCollections.delete()
            barterImages=BarterImage.objects.filter(barterSha1=barterSha1)
            barterImages.delete()
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    elif type=="change-salestate":
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            barterSha1=command['barterSha1']
            saleState=command['saleState']
            try:
                barter=Barter.objects.get(sha1=barterSha1)
            except:
                rsdic={'ret':'1105','info':'Barter does not exists'}
                return
            barter.saleState = saleState
            barter.save()
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

    # process the LOGOUT request
    elif type=="logout":
        response = HttpResponse(json.dumps(rsdic))
        response.delete_cookie('username')
        if request.META.has_key('HTTP_SESSIONID'):
            sessionid=request.META['HTTP_SESSIONID']
            session=Session.objects.filter(session_key=sessionid)
            session.delete()
        return response


def check_login(request):
    rsdic={'ret':1101,'info':'ok'}
    if request.META.has_key('HTTP_SESSIONID'):
        sessionid=request.META['HTTP_SESSIONID']
        session=Session.objects.filter(session_key=sessionid)
        if len(session)==0:
            rsdic={'ret':1105,'info':'Session expired'}
        request.session['username']=session[0].get_decoded()['username']
    else:
		if not request.is_ajax() and not request.session.has_key("username"):
			rsdic={'ret':1104,'info':'No session id'}
			rsdic['head']=str(request)
    return rsdic


def ajax_upload(request):
        rsdic=check_login(request)
        if rsdic['ret']!=1101:
            return HttpResponse(json.dumps(rsdic))
        try:
            if request.POST.has_key('barterSha1'):
                barterSha1=request.POST['barterSha1']
            elif request.POST.has_key('userName'):
                username = request.POST['userName']
                try:
                    user = User.objects.get(username=username)
                except:
                    rsdic={'ret':'1105','info':'User does not exist'}
                    return
            else :
                raise Exception
            upload_image=request.FILES.values()[0]
            image_name=upload_image.name
            image_format=get_image_format(image_name)
            sha=hashlib.sha1(image_name+str(time.time()))
            sha1=sha.hexdigest()
            image_name=sha1+'.'+image_format
            #upload file
            file=open(settings.UPLOAD_FILE_PATH+image_name,'wb')
            file_content=''
            for chunk in upload_image.chunks():
                file_content+=chunk
            file.write(file_content)
            file.close()

            #resize image
            file_name='resize_'+image_name
            image=Image.open(settings.UPLOAD_FILE_PATH+image_name)
            image.thumbnail((200,200),Image.ANTIALIAS)
            image.save(settings.UPLOAD_RESIZE_FILE_PATH+file_name,image.format)
            if request.POST.has_key('barterSha1'):
                #save file in database
                image=BarterImage(barterSha1=barterSha1,imageName=image_name)
                image.save()
            elif request.POST.has_key('userName'):
                #save avatar
                user.avatar=image_name
                user.save()
            else :
                raise Exception
            return
        except Exception,e:
            rsdic['ret']=1104
            rsdic['info']=str(e)
            print str(e)
            return HttpResponse(json.dumps(rsdic))
        finally:
            return HttpResponse(json.dumps(rsdic))

def get_image_format(image):
    return image.split('.')[-1]

def index(request):
#    username = request.session['username']
    return render_to_response("index.html")

def login(request):
    return render_to_response("login.html")


def release(request):
    username = request.session['username']
    return render_to_response("release.html",{"username":username})

def reg(request):
    return render_to_response("reg.html")

def userInfo(request):
    username = request.session['username']
    return render_to_response("userInfo.html",{"username":username})

def myRelease(request):
    username = request.session['username']
    return render_to_response("myRelease.html",{"username":username})

def myCollect(request):
    username = request.session['username']
    return render_to_response("myCollect.html",{"username":username})

def head(request):
    username = request.session['username']
    return render_to_response("head.html",{"username":username})

def barterDetail(request):
    username = request.session['username']
    return render_to_response("barterDetail.html",{"username":username})

def loginhtml(request):
    return render_to_response("login.html")

def recenthtml(request):
    username = request.session['username']
    return render_to_response("recent.html",{"username":username})

def reghtml(request):
    return render_to_response("reg.html")

def myCollecthtml(request):
    username = request.session['username']
    return render_to_response("myCollect.html",{"username":username})

def myReleasehtml(request):
    username = request.session['username']
    return render_to_response("myRelease.html",{"username":username})

def releasehtml(request):
    username = request.session['username']
    return render_to_response("release.html",{"username":username})

def barterDetailhtml(request):
    username = request.session['username']
    return render_to_response("barterDetail.html",{"username":username})

def userInfohtml(request):
    username = request.session['username']
    return render_to_response("userInfo.html",{"username":username})
