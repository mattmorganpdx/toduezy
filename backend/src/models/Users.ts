const crypto = require('crypto');
const jwt = require('jsonwebtoken');
import * as dynamoose from "dynamoose";
import { v4 as uuidV4 } from 'uuid';

const UsersSchema = new dynamoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        displayName: String,
        userId: {
            type: String,
            required: true,
            default: uuidV4,
            forceDefault: true
        },
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

User.methods.document.set("generateJWT", async function() {
    const expirationDate = new Date();
    expirationDate.setDate(new Date().getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, 'secret');
})


User.methods.document.set("toAuthJSON", async function () {
    return {
        userId: this.userId,
        email: this.email,
        token: await this["generateJWT"](),

    };
});

export default User
exports.modules = User//dynamoose.model('Users', UsersSchema);