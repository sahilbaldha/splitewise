import jwt from "jsonwebtoken";
export const authenticateUser = async (req, res, next) => {
    const { auth_token } = req.cookies;
    if (!auth_token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRATEKEY);
        req.user = decoded;
        return next();
    }
    catch (err) {
        throw new Error("Invalid manual token");
    }
};
