import { ZodError } from "zod";
export const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        return next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const allMessages = error.issues.map((issue) => issue.message);
            return res.status(400).json({ message: allMessages[0] });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
