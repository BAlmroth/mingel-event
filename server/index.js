import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import supabase from "./supabaseClient.js";
import session from "express-session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, ".env") });


import express from "express";
import cors from "cors";
import linkedinAuth from "./linkedinAuth.js";

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true 
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);



// store info through session, to avoid info in url
app.get("/me", async (req, res) => {
  const { userId, linkedinData } = req.session;

  if (userId) {
    const { data, error } = await supabase
      .from("users").select("*").eq("id", userId).single();
    
    if (error || !data) {
      // user not found, clear userId from session
      req.session.userId = null;
      if (linkedinData) return res.json(linkedinData);
      return res.status(401).json({ error: "Not logged in" });
    }
    
    return res.json(data);
  }

  if (linkedinData) return res.json(linkedinData);

  return res.status(401).json({ error: "Not logged in" });
});

app.post("/profile", async (req, res) => {
  const { userId, linkedinData } = req.session;
  if (!linkedinData && !userId) return res.status(401).json({ error: "Not logged in" });

  const { role, description, fun_fact, email } = req.body;

  if (userId) {
    // returning user — just update
    const { data: user, error: userError } = await supabase
      .from("users").select("first_name, last_name").eq("id", userId).single();
    if (userError) return res.status(500).json({ error: "User fetch failed" });

    const username = `${user.first_name}-${user.last_name}-${userId.slice(0, 4)}`
      .toLowerCase().replace(/\s+/g, "-");

    const { data, error } = await supabase
      .from("users").update({ role, description, fun_fact, username, email })
      .eq("id", userId).select().single();

    if (error) return res.status(500).json({ error: "Failed to update profile" });
    return res.json(data);
  }

  // new user — insert for the first time
  const username = `${linkedinData.first_name}-${linkedinData.last_name}`
    .toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabase
    .from("users")
    .upsert([{ ...linkedinData, role, description, fun_fact, email, username }], 
      { onConflict: "linkedin_id" })
    .select().single();

  if (error) return res.status(500).json({ error: "Failed to save profile" });

  req.session.userId = data.id;
  req.session.linkedinData = null;

  res.json(data);
});

//destroy linkedin session on logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

app.use("/auth/linkedin", linkedinAuth);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});