import { NextFunction, Request, Response } from "express";
import GeneralModel, { GeneralBean } from "../models/General";
import axios from "axios";
import * as momentTz from 'moment-timezone';



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


export const fbAdschatBotQualifiedWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {

        axios.post(
            'https://api.whatstool.business/webhook/v1/fb_ads_chatbot_qualified',
            {
                mobile: req.body.mobile,
            }
        )
            .then(res => console.log(res.data))
            .catch(err => console.error(err.message))

        return res.status(200).send({ status: true, message: 'success', data: true })

    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


export const fbAdschatBotQualifiedAppointmentWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const currentDate = momentTz.tz('Asia/Kolkata');
        const tomorrowDate = currentDate.clone().add(1, 'day');
        const tomorrow = tomorrowDate.format('ddd MMM DD YYYY');
        const tz = ':00:00 GMT+0530 (IST)'
        const time_map: { [key: string]: { start: string, end: string } } = {
            "10.00 - 11.00 AM": { start: `${tomorrow} 10${tz}`, end: `${tomorrow} 11${tz}` },
            "11.00 - 12.00 PM": { start: `${tomorrow} 11${tz}`, end: `${tomorrow} 12${tz}` },
            "12.00 - 01.00 PM": { start: `${tomorrow} 12${tz}`, end: `${tomorrow} 13${tz}` },
            "01.00 - 02.00 PM": { start: `${tomorrow} 13${tz}`, end: `${tomorrow} 14${tz}` },
            "02.00 - 03.00 PM": { start: `${tomorrow} 14${tz}`, end: `${tomorrow} 15${tz}` },
            "03.00 - 04.00 PM": { start: `${tomorrow} 15${tz}`, end: `${tomorrow} 16${tz}` },
            "04.00 - 05.00 PM": { start: `${tomorrow} 16${tz}`, end: `${tomorrow} 17${tz}` },
            "05.00 - 06.00 PM": { start: `${tomorrow} 17${tz}`, end: `${tomorrow} 18${tz}` },
            "06.00 - 07.00 PM": { start: `${tomorrow} 18${tz}`, end: `${tomorrow} 19${tz}` }
        }

        const params = {
            time_slot: time_map[req.body.time_slot],
            mobile: req.body.mobile,
            fs_contact_id: req.body.fs_contact_id
        }

        if (!params.time_slot) {
            return res.status(400).send({ status: false, message: `Invalid time slot : ${req.body.time_slot}` })
        }

        const response = await axios.post(
            'https://api.whatstool.business/webhook/v1/fb_ads_create_meeting',
            {
                mobile: params.mobile,
                fs_contact_id: params.fs_contact_id,
                from_date: params.time_slot.start,
                end_date: params.time_slot.end
            }
        )

        const sch = params.time_slot.start.replace('GMT+0530', '')
        return res.status(200).send({
            type: "text",
            text: {
                body: `Thank you! \n Your meeting is schedule on *${sch}*.\n Someone from our team will reach out to you soon.`
            }
        })

    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message })
    }
}