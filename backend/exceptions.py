class MatchingBackendError(Exception):
    pass


class XMLConfigurationError(MatchingBackendError):
    pass


class DBColumnDoesNotExist(XMLConfigurationError):

    def __init__(self, msg, column):
        super().__init__(msg)
        self.column = column
