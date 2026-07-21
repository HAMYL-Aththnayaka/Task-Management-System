const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Please provide the Token"
            })
        }

        console.log(authHeader);

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        req.user = decoded;
        return next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
module.exports = authMiddleware;