const messages = {
    "REQUIRED":  "can not be empty",
    "TOO_SHORT": "too short",
    "NOT_UNIQUE": "already exist",
    "NOT_MATCH": "not match",
    "WRONG_PASSWORD": "WRONG PASSWORD"
}

function getMessage (errorCode) {
    return messages[errorCode]
}

module.exports = getMessage;