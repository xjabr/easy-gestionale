from rest_framework.response import Response

def success_response(results, other_data = dict(), status_code = 200):
  return Response(
    dict(
      ok = True,
      results = results,
      **other_data
    ),
    status = status_code
  )


def error_response(results, other_data = dict(), status_code = 400):
  return Response(
    dict(
      ok = False,
      errors = results,
      **other_data
    ),
    status = status_code
  )