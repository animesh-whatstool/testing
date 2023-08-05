import { NextFunction, Request, Response } from "express";
import GeneralModel, { GeneralBean } from "../models/General";


export const testing = async (req: Request, res: Response, next: NextFunction) => {
    try {

        return res.status(200).send({
            "type": "text",
            "text": {
                "body": `Congratulations🎉🎉🎉! Your slot has been booked. \n Service Name- ${"sName"}\n Booked Date- ${"bDate"}\n Booked Time- ${"bTime"}\n Address- ${"bAdd"}`
            }
        })

    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

export const createFunction = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const saveData: GeneralBean = {
            name: req.body.name,
            code: req.body.code
        }
        const cloud_function = await GeneralModel.create(saveData)

        return res.status(200).send({ status: true, message: 'success', data: cloud_function })
    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


export const evalFunction = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const data = {
            name: req.body.name,
            param_1: req.body.param_1,
            param_2: req.body.param_2,
        }

        const func = await GeneralModel.findOne({ name: data.name }) as GeneralBean

        const userDefinedFunction = eval(`(${func.code})`);
        const sum = userDefinedFunction(data.param_1, data.param_2)


        return res.status(200).send({ status: true, message: 'success', data: sum })
    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message })
    }
}