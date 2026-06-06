import mongoose, { Schema } from "mongoose";

const UelSchema = new Schema(
    {
        url: {
            type: String,
            required: true
        },
        shortUrlId:{
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
