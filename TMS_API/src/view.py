from django.http import HttpResponse
from django.views import View


class TaskView(View):
    def getMessage(request):
        if request.method == 'GET':
            return HttpResponse("Test")
