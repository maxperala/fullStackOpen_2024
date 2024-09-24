class UsernameExistsOrMissing extends Error {
    constructor(message = "Username already exists or is not provided") {
        super(message);
        this.name = "UsernameExistsOrMissing"
    }
}



module.exports = {UsernameExistsOrMissing};