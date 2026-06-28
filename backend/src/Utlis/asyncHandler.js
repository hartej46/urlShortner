const asyncHandler = (fn) => async(req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        console.log("There is something wrong", error);
        return res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export default asyncHandler;