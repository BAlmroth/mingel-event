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
  try {
    const code = req.query.code;

    //get access token
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

    // get user profile
    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const profileData = profileResponse.data;
    console.log("PROFILE DATA:", profileData);

    // put user in Supabase
    const user = {
      linkedin_id: profileData.sub,
      first_name: profileData.given_name,
      last_name: profileData.family_name,
      picture: profileData.picture,
    };

    const { data, error } = await supabase
      .from("users")
      .upsert([user], { onConflict: "linkedin_id" })
      .select()
      .single(); // return single row

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).send("Database error");
    }

    console.log("Saved LinkedIn user:", data);

    //store user id in session
    req.session.userId = data.id;

    // Redirect to frontend with clean URL
    const frontendUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
    res.redirect(`${frontendUrl}/create-profile-linkedin`);

  } catch (err) {
    console.error(err);
    res.status(500).send("LinkedIn login failed");
  }
});

export default router;
