import { useEffect, useState } from "react";
import Styles from "./CreateProfile.module.css";
import { PageHeader } from "./StartupHeader";
import { getInitials } from "../../utils/helpers";
import linkedIn from "../../assets/linkedIn.svg";

export function CreateProfile() {
  const role = localStorage.getItem("role");
  const isStudent = role === "student";

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fun_fact, setFunfact] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setName(`${data.first_name} ${data.last_name}`);
          setImage(data.picture);
          if (data.description) setDescription(data.description);
          if (data.fun_fact) setFunfact(data.fun_fact);
          if (data.email) setEmail(data.email);
        }
      })
      .catch((err) => console.error("Fetch /me failed:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "POST",
      credentials: "include", // sends the session cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, description, fun_fact, email }),
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
    <section>
      <PageHeader />
      {image ? (
        <img
          src={image}
          alt="Profile picture"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      ) : (
        name && (
          <div className="initials">
            {getInitials(user.first_name, user.last_name)}
          </div>
        )
      )}

      <form className={Styles.inputInfo} onSubmit={handleSubmit}>
        {!name && (
          <button type="button" className={Styles.linkedinBtn} onClick={handleLinkedInLogin}>
           <img src={linkedIn} alt="linkedIn logo" />
            Sign in with LinkedIn
          </button>
        )}

        {name && (
          <div className={Styles.greeting}>
            <label>Welcome,</label>
            <p>{name}</p>
          </div>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          type="email"
          placeholder="your emailadress"
          onChange={(e) => setEmail(e.target.value)}
        />

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
          placeholder="e.g. Ask me about my favorite superhero"
          onChange={(e) => setFunfact(e.target.value)}
        />
        <button type="submit">Start the stalking</button>
      </form>
    </section>
  );
}
