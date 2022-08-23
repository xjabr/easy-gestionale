class ResultError(Exception):
  def __init__(self, message = 'Errore nel risultato', status = 500, *args: object) -> None:
    self.message = message
    self.status = status

  def __str__(self):
    return self.message

  def get_status(self):
    return self.status


def assert_error(condition, message = 'Exception', status = 500):
  if condition:
    raise ResultError(message, status)