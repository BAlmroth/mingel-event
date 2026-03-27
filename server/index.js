import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import supabase from "./supabaseClient.js";
import session from "express-session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("ENV CHECK:", process.env.SUPABASE_URL);

import express from "express";
import cors from "cors";
import linkedinAuth from "./linkedinAuth.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//session
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true in production (https)
      httpOnly: true,
    },
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});


// store info trhough session, to avoid info in url
app.get("/me", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return res.status(500).json({ error: "User not found" });

  res.json(data);
});

//UPDATE DATABSE TO INCLUDE ROLE AND DESCRIPTION
app.post("/profile", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const { role, description } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({ role, description })
    .eq("id", userId)
    .select()
    .single();

  if (error) return res.status(500).json({ error: "Failed to update profile" });

  res.json(data);
});

app.use("/auth/linkedin", linkedinAuth);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
