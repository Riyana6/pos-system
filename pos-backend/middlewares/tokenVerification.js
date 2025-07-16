const createHttpError = require('http-errors');

const isVerifiedUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            const error = createHttpError(401, "You are not authenticated");
            return next(error);
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

        const user = await User.findById(decodeToken._id);
        if (!user) {
            const error = createHttpError(401, "User not exist");
            return next(error);
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { isVerifiedUser };