import express from "express";
import axios from "axios";
import qs from "qs";

const router = express.Router();

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
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/me",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const profileData = profileResponse.data;

    // Redirect tillbaka till CreateProfile.jsx med profil-data i query params
    const frontendRedirect = `${process.env.FRONTEND_URL}/create-profile?firstName=${profileData.localizedFirstName}&lastName=${profileData.localizedLastName}`;
    res.redirect(frontendRedirect);

  } catch (err) {
    console.error(err);
    res.status(500).send("LinkedIn login failed");
  }
});

export default router;