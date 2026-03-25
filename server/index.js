import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("ENV CHECK:", process.env.SUPABASE_URL);

import express from 'express';
import cors from "cors";
import linkedinAuth from "./linkedinAuth.js";


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use("/auth/linkedin", linkedinAuth);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

