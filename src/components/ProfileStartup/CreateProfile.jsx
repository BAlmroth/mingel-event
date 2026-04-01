import { useEffect, useState } from "react";
import Styles from "./CreateProfile.module.css";
import { PageHeader } from "./StartupHeader";
import { useNavigate } from "react-router-dom";

export function CreateProfile() {
  const role = localStorage.getItem("role");
  const isStudent = role === "student";
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fun_fact, setFunfact] = useState("");

  //fetch logged-in LinkedIn user
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setName(`${data.first_name} ${data.last_name}`);
          setImage(data.picture);
        }
      })
      .catch((err) => console.error("Fetch /me failed:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "POST",
      credentials: "include", // sends the session cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, description, fun_fact }),
    });

    if (res.ok) {
      window.location.href = "/feed";
    } else {
      console.error("Failed to save profile");
    }
  };

  // LinkedIn login button is only shown if not logged in
const handleLinkedInLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/linkedin/login`;
};

  return (
    <>
      <section>
        <PageHeader />

        {image && (
          <img
            src={image}
            alt="Profile picture"
            style={{ width: "150px", borderRadius: "50%" }}
          />
        )}

        <form className={Styles.inputInfo} onSubmit={handleSubmit}>
          {!name && (
            <button type="button" onClick={handleLinkedInLogin}>
              Log in with LinkedIn
            </button>
          )}

          {name && (
            <div className={Styles.greeting}>
              <label>Welcome,</label>
              <p>{name}</p>
            </div>
          )}

          <label htmlFor="company">{isStudent ? "Program" : "Company"}</label>
          <input
            id="company"
            name={isStudent ? "program" : "company"}
            value={description}
            type="text"
            placeholder={
              isStudent ? "e.g. Digital Design at Yrgo" : "Your company"
            }
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="funfact">Fun fact</label>
          <input
            id="fun_fact"
            value={fun_fact}
            type="text"
            placeholder={
              "e.g. Ask me about my favorite superhero "
            }
            onChange={(e) => setFunfact(e.target.value)}
          />
          <button type="submit">Start the stalking</button>
        </form>
      </section>
    </>
  );
}
