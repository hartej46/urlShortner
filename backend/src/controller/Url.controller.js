import client from "../db/redis.js";
import { Url } from "../model/url.model.js";
import asyncHandler from "../Utlis/asyncHandler.js";
import { redisKey } from "../Utlis/redisKey.js";
import { nanoid } from "nanoid";

const createShortUrl = asyncHandler(async (req, res) => {
    const urlRecived = req.body;
    const originalUrl = urlRecived.url
    console.log("Original URL", urlRecived)
    if (!originalUrl || !originalUrl.trim()) return res.json({
        success: false,
        message: "Return Proper URL"
    })

    let shortId = nanoid(8);
    let checkShortId = await Url.findOne({shortId});

    if (checkShortId) {
        while (checkShortId){
            shortId = nanoid(8)
            checkShortId = await Url.findOne({shortId});
        }
    }
    const newUrl = await Url.create({
            shortId,
            originalUrl,
        });

    return res.status(201).json({
            success: true,
            message: "Short URL generated successfully!",
            shortId: newUrl.shortId,
            shortUrl: `${req.protocol}://${req.get("host")}/${newUrl.shortId}` 
    })
})

const handleUrlRedirection = asyncHandler( async (req, res) => {
    const shortId = req.params.shortId;

    const cachedUrl = await client.get(redisKey('url',shortId));
    if (cachedUrl) { 
        
        return res.redirect(cachedUrl)
    }
    
    const originalData = await Url.findOne({ shortId });
    if (!originalData) return res.status(404)
                                .json({
                                    success: false,
                                    message: "URL invalid"
                                })

    await client.set(redisKey('url',shortId), originalData.originalUrl,'EX', 86400);

    return res.redirect(originalData.originalUrl);
})

export {
    createShortUrl,
    handleUrlRedirection
}