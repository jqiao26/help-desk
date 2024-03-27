class Response:
    def __init__(self, message, status, data) -> None:
        self.message = message
        self.status = status
        self.data = data

    def get_response_obj(self):
        return {"status": self.status, "data": self.data, "message": self.message}
