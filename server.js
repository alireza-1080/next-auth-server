import app from './app.js';
import "dotenv/config";
import dbConnect from './configs/db.js';

const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});