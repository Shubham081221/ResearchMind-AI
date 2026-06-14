
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import researchRoutes from "./routes/research.routes.js";
import searchRoutes from "./routes/search.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/research", researchRoutes);
app.use("/api/search", searchRoutes);



app.get('/', (req,res) => {
    res.json({
        "success": true,
        "message": "ReasearchMIND AI is running successfully!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is runnung on port ${PORT}`);
});

