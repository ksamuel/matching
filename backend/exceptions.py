from rest_framework.exceptions import APIException


class MatchingBackendError(Exception):
    pass


class XMLConfigurationError(MatchingBackendError):
    pass


class DBColumnDoesNotExist(XMLConfigurationError):
    def __init__(self, msg, column):
        super().__init__(msg)
        self.column = column


class SamplingConfigurationError(MatchingBackendError):
    pass


class InsufficientPopulationSize(SamplingConfigurationError):
    def __init__(self, msg, requested_size, actual_size):
        super().__init__(msg)
        self.requested_size = requested_size
        self.actual_size = actual_size


class RequestedSampleIsTooBig(APIException):
    status_code = 400

    def __init__(self, requested_size, actual_size):
        super().__init__(
            detail=f"Vous avez demandé {requested_size} paires, mais {actual_size} correspondent à vos critères"
        )
