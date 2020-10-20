const crypto = require('crypto');
const jwt = require('jsonwebtoken');
import * as dynamoose from "dynamoose";

const UsersSchema = new dynamoose.Schema(
    {
        email: String,
        userId: String,
        hash: String,
        salt: String,
    }, {
        "saveUnknown": true,
        "timestamps": true
    }
);

const User = dynamoose.model("User", UsersSchema, {"create": true});

User.methods.document.set("setPassword", function (password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
});

User.methods.document.set("validatePassword", function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
});

User.methods.document.set("generateJWT", function() {
    const expirationDate = new Date();
    expirationDate.setDate(new Date().getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, 'secret');
})


User.methods.document.set("toAuthJSON", function () {
    return {
        _id: this._id,
        email: this.email,
        token: this["generateJWT"](),

    };
});

export default User
exports.modules = User//dynamoose.model('Users', UsersSchema);