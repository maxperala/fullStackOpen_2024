class UsernameExistsOrMissing extends Error {
    constructor(message = "Username already exists or is not provided") {
        super(message);
        this.name = "UsernameExistsOrMissing"
    }
}

class PasswordTooShort extends Error {
    constructor(message = "Please provide a password of at least 3 characters") {
        super(message);
        this.name = "PasswordTooShort"
    }
}

class UsernameMissing extends Error {
    constructor(message = "Please provide a username") {
        super(message)
        this.name = "UsernameMissing"
    }
}

class UserNotFound extends Error {
    constructor(message = "User does not exist, please register") {
        super(message)
        this.name = "UserNotFound"
    }
}

class IncorrectPassword extends Error {
    constructor(message = "Incorrect password") {
        super(message)
        this.name = "IncorrectPassword"
    }
}

module.exports = {UsernameExistsOrMissing, PasswordTooShort, UsernameMissing, UserNotFound, IncorrectPassword};