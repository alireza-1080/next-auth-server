import jwt from 'jsonwebtoken';
import "dotenv/config";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

export default generateToken;