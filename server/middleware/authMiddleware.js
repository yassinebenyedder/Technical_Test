const jwt = require('jsonwebtoken');

//middleware to protect courses routes and admins routes
exports.verifytoken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is required" });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JwtSecret);

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};