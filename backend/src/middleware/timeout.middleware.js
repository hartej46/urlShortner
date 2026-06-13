const timeout = (req, res, next) => {
    setTimeout(() => {
        next();
    }, 1400);
};

export default timeout;