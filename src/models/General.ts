import mongoose, { Mongoose, ObjectId, Schema } from 'mongoose'

export interface GeneralBean {
    _id?: ObjectId
    name?: string
    code?: string
}

const generalSchema: Schema = new Schema<GeneralBean>(
    {
        name: {
            type: String,
            trim: true,
            unique: true
        },
        code: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
)

const GeneralModel = mongoose.model('General', generalSchema)
export default GeneralModel