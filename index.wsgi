import sae

from CollegeBarter import wsgi
import os


os.environ['DJANGO_SETTINGS_MODULE'] = 'CollegeBarter.settings'
root = os.path.dirname(__file__)
application = sae.create_wsgi_app(wsgi.application)
