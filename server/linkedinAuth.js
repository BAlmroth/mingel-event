import express from "express";
import axios from "axios";
import qs from "qs";
import supabase from "./supabaseClient.js";

const router = express.Router();

//temporär substitution till databas
const users = [];

router.get("/login", (req, res) => {
  const params = qs.stringify({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: "openid profile email",
    state: "123456",
  });

  const url = `https://www.linkedin.com/oauth/v2/authorization?${params}`;

  console.log("LINKEDIN URL:");
  console.log(url);

  res.redirect(url);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    const accessToken = tokenResponse.data.access_token;

    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // samla data för profilen ifrån linkedin
    const profileData = profileResponse.data;
    console.log("PROFILE DATA:", profileData);

    const user = {
      first_name: profileData.given_name,
      last_name: profileData.family_name,
      picture: profileData.picture,
    };

    const { data, error } = await supabase
    .from("users")
    .insert([user]);

    if (error) {
      console.error("Supabase error:", error);
    } else {
      console.log("Saved user:", data);
    }

    console.log("URL:", process.env.SUPABASE_URL);
    console.log("KEY:", process.env.SUPABASE_KEY);

    // users.push(user);
    // console.log("saved user", user);

    const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");

    // Redirect tillbaka till CreateProfile.jsx med profil-data i query params
    const frontendRedirect = `${frontendUrl}/create-profile?first_name=${user.first_name}&last_name=${user.last_name}&picture=${encodeURIComponent(user.picture)}`;

    
    res.redirect(frontendRedirect);
  } catch (err) {
    console.error(err);
    res.status(500).send("LinkedIn login failed");
  }
});

export default router;
