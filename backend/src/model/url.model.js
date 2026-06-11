import mongoose, { Schema } from "mongoose";

const UelSchema = new Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },
        shortId:{
            type: String,
            required: true,
        },
        clicks: {
        type: Number,
        required: true,
        default: 0, 
        }, 
    },
    {timeseries: true}
)


export const Url = mongoose.model("Url", UelSchema);
