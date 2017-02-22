from django.http import HttpResponse
from django.shortcuts import render
from fanFicMadLib import getStory
import json
#import remix

#django-cors-headers

import pdb

def landing(request):
    context = {'Test': 'test'}
    return render(request, 'fanfic_remix/index.html', context)

def index(request):
    #return HttpResponse("Hello, world. You're at the yarnspin index.")
    items = getStory()
    #pdb.set_trace()
    print(items)
    resp = {
        'story': items[1],
        'names': items[0],
    }
    return HttpResponse(json.dumps(resp))

# Create your views here.
