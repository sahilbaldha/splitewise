import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod"; 

export const validate =


  (schema: ZodType<any, any, any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const allMessages = error.issues.map((issue) => issue.message);
        return res.status(400).json({ message: allMessages[0] }); 
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  