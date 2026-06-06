import client from "../db/redis";
import { Url } from "../model/url.model";
import asyncHandler from "../Utlis/asyncHandler";
import { redisKey } from "../Utlis/redisKey";
import { nanoid } from "nanoid";

const createShortUrl = asyncHandler(async (req, res) => {
    const {originalUrl} = req.body;
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
    const { shortId } = req.params;

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

// const deleteUrlRedirection //I will design it later

export {
    createShortUrl,
    handleUrlRedirection
}