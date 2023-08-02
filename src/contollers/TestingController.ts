import { NextFunction, Request, Response } from "express";


export const testing = async (req: Request, res: Response, next: NextFunction) => {
    try {

        return res.status(200).send({
            "type": "text",
            "text": {
                "body": `Congratulations🎉🎉🎉! Your slot has been booked. \n Service Name- ${"sName"}\n Booked Date- ${"bDate"}\n Booked Time- ${"bTime"}\n Address- ${"bAdd"}`
            }
        })

    } catch (error: any) {
        return res.send(500).send({ status: false, message: error.message })
    }
}