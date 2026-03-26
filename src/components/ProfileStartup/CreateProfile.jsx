import { useEffect, useState } from "react";
import Styles from "./CreateProfile.module.css";
import { PageHeader } from "./StartupHeader";

export function CreateProfile() {
  const role = localStorage.getItem("role");
  const isStudent = role === "student";

  const [image, setImage] = useState("");
  const [name, setName] = useState("");

//fetch logged-in LinkedIn user
  useEffect(() => {
    fetch("http://localhost:4000/me", { credentials: "include" })
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // save company/program info later
  };

  // LinkedIn login button is only shown if not logged in
  const handleLinkedInLogin = () => {
    window.location.href = "http://localhost:4000/auth/linkedin/login";
  };

  return (
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
          type="text"
          placeholder={isStudent ? "e.g. Digital Design at Yrgo" : "Your company"}
        />
        <button type="submit">Start the stalking</button>
      </form>
    </section>
  );
}