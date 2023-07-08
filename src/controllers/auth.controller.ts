import { RequestHandler } from "express";
import UserModel from "../db/model/user.model";
import { AuthService } from "../services/auth.service";
import ResponseHandler from "../utils/response-helper/response-helper";


export const signupController: RequestHandler = async (req, res, next) => {

    const { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string } = req.body;

    // check is the user exists already
    const userExists = await UserModel.findOne({ where: { email: email } });

    if (userExists) {
        res.status(400).json({
            status: false, message: "User already exists"
        })
        return;
    }

    // Generate a UUID for the user
    const userUuid = new AuthService().generateUUID();

    // hash user password
    const hashPass = await new AuthService().hash(password.trim());

    await UserModel.create({
        firstName: firstName.trim().toLowerCase(),
        lastName: lastName.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password: hashPass,
        userUuid: userUuid
    }).then((user) => {
        res.status(200).json({ status: 'success', data: user })
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ status: false, data: error.message })
    })

};

export const loginController: RequestHandler = async (req, res, next) => {
    const { email, password }: { email: string, password: string } = req.body;

    const user = await UserModel.findOne({
        where:
            { email: email }
    });

    if (!user) {
        res.status(404).json({ message: "User Not Found! Please sign up." });
        return
    }

    const compare = await new AuthService().compare(password, user.dataValues.password)

    if (compare == false) {
        res.status(400).json({ status: "error", message: "Incorrect Password"});
        return
    }

    const body: object = { userUuid: user.dataValues.userUuid, email: user.dataValues.email }
    const token = new AuthService().jwtSign(body);

    res.status(200).json({ status: 'Success', message: 'Login successful', data: { token: token } })
};
