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


class InsuffisantSampleSize(SamplingConfigurationError):
    def __init__(self, msg, requested_size, actual_size):
        super().__init__(msg)
        self.requested_size = requested_size
        self.actual_size = actual_size
