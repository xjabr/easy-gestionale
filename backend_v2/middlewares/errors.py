from django.http import JsonResponse

class ExceptionMiddleware:
  def __init__(self, get_response):
    self.get_response = get_response


  def __call__(self, request):
    response = self.get_response(request)

    if response.status_code == 404 and response['Content-Type'] == 'text/html':
      return JsonResponse(
        dict(
          ok = False,
          code = 'not_found',
          message = "Resource or page not found",
          status = 404,
          error = '404 Not found'
        ),
        safe = False,
        status = 404
      )

    return response


  def process_exception(self, request, exception):
    try:
      status = exception.get_status()
    except:
      status = 500

    data = dict(
      ok = False,
      code = 'unknown_error',
      message = 'Interal Server Error',
      status = status,
      error = str(exception)
    )

    return JsonResponse(data, safe=False, status=status)