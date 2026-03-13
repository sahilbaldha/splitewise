import { prisma } from "../lib/prisma.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../config/googleconfig.js";
const JWT_SECRATEKEY = process.env.JWT_SECRATEKEY;
function generateHash(salt, password) {
    return crypto.createHmac("sha256", salt).update(password).digest("hex");
}
const generatetoken = (data) => {
    const token = jwt.sign({
        userId: data.userId,
        email: data.email,
        isAdmin: data.isAdmin,
    }, JWT_SECRATEKEY, { expiresIn: "30d" });
    data.res.cookie("auth_token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    return data.res.status(200).json({
        message: "Authentication successful",
    });
};
export const user = async (req, res) => {
    const { name, email, password, code } = req.body;
    if (code) {
        try {
            const { code } = req.body;
            console.log(code);
            const { tokens } = await oauth2Client.getToken({
                code: code,
            });
            const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`);
            const userInfo = (await userInfoResponse.json());
            console.log(tokens);
            const { email, name } = userInfo;
            let signUser = await prisma.user.findUnique({ where: { email } });
            if (signUser) {
                return res.status(400).json({ message: "User already exists!" });
            }
            signUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    google: true,
                    isAdmin: false,
                },
            });
            generatetoken({
                userId: signUser.id,
                email: signUser.email,
                isAdmin: signUser.isAdmin,
                res,
            });
        }
        catch (err) {
            // @ts-ignore
            console.error("Google Login Error:", err?.response);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists!" });
            }
            const salt = crypto.randomBytes(16).toString("hex");
            const hashedPassword = generateHash(salt, password);
            const userData = await prisma.user.create({
                data: {
                    email,
                    name,
                    hashedPassword,
                    salt,
                },
            });
            generatetoken({
                userId: userData.id,
                email: userData.email,
                isAdmin: userData.isAdmin,
                res,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
export const login = async (req, res) => {
    const { email, password, code } = req.body;
    if (code) {
        try {
            const { tokens } = await oauth2Client.getToken(code);
            const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`);
            const userInfo = (await userInfoResponse.json());
            const { email } = userInfo;
            const signUser = await prisma.user.findUnique({ where: { email } });
            if (!signUser) {
                return res.status(401).json({ message: "invalid credentials" });
            }
            console.log(signUser);
            generatetoken({
                userId: signUser.id,
                email: signUser.email,
                isAdmin: signUser.isAdmin,
                res,
            });
        }
        catch (err) {
            console.error("Google Login Error:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else {
        try {
            const foundUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!foundUser) {
                return res.status(401).json({ message: "invalid credentials" });
            }
            if (foundUser.salt) {
                const hashedPassword = generateHash(foundUser.salt, password);
                if (hashedPassword != foundUser.hashedPassword) {
                    return res.status(400).json({ message: "invalid credentials" });
                }
            }
            generatetoken({
                userId: foundUser.id,
                email: foundUser.email,
                isAdmin: foundUser.isAdmin,
                res,
            });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
export const logout = (req, res) => {
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "logout" });
    }
    catch (err) {
        res.status(500).json({ message: "internal server error" });
    }
};
