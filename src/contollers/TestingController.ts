import { NextFunction, Request, Response } from "express";


export const testing = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        return res.send(500).send({ status: false, message: error.message })
    }
}