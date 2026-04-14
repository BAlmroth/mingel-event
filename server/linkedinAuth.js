import express from "express";
import axios from "axios";
import qs from "qs";
import supabase from "./supabaseClient.js";

const router = express.Router();

router.get("/login", (req, res) => {
  const params = qs.stringify({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: "openid profile email",
    state: "123456",
    prompt: "login",
  });

  const url = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  res.redirect(url);
});

router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;

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
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    const profileData = profileResponse.data;
    // in the callback, replace the session store with:
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("linkedin_id", profileData.sub)
      .maybeSingle();

    if (existingUser) {
      // returning user — just set userId
      req.session.userId = existingUser.id;
    } else {
      // new user — store linkedin data temporarily
      req.session.linkedinData = {
        linkedin_id: profileData.sub,
        first_name: profileData.given_name,
        last_name: profileData.family_name,
        picture: profileData.picture,
        email: profileData.email,
      };
    }
    const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
    res.redirect(`${frontendUrl}/create-profile-linkedin`);
  } catch (err) {
    console.error(err);
    res.status(500).send("LinkedIn login failed");
  }
});

export default router;
