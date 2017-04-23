from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('CollegeBarter.college_barter.views',
    # Examples:
    # url(r'^$', 'collegeBarter.views.home', name='home'),
    # url(r'^collegeBarter/', include('collegeBarter.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
	(r"^login/$","index"),
	(r"^index/$","index"),
	(r"^recent/$","index"),
	(r"^head.html/$","head"),
	(r"^login.html/$","loginhtml"),
	(r"^recent.html/$","recenthtml"),
	(r"^reg.html/$","reghtml"),
	(r"^myCollect.html/$","myCollecthtml"),
	(r"^myRelease.html/$","myReleasehtml"),
	(r"^release.html/$","releasehtml"),
	(r"^barterDetail.html/$","barterDetailhtml"),
	(r"^userInfo.html/$","userInfohtml"),
	(r"^$","index"),
    (r"^request/$","android_request"),
	(r"^api/$","android_request"),
	(r"^release/$","release"),
    (r"^api/ajax_upload/$","ajax_upload"),
    (r"^ajax_upload","ajax_upload"),
	(r"^reg/$","reg"),
    (r"^userInfo/$","userInfo"),
    (r"^myRelease/$","myRelease"),
    (r"^myCollect/$","myCollect"),
    (r"^barterDetail/$","barterDetail"),
)


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#from django.contrib.staticfiles.urls import staticfiles_urlpatterns
#urlpatterns += staticfiles_urlpatterns()
