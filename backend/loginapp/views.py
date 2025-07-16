from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({'status': 'ok'})
            else:
                return JsonResponse({'status': 'fail'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    # Si se accede por GET, devuelve un mensaje (opcionalmente puedes usar HttpResponseNotAllowed)
    return JsonResponse({'detail': 'Método no permitido. Usa POST para autenticar.'}, status=405)
