import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./CreateProfile.module.css";
import { PageHeader } from "./StartupHeader";


export function CreateProfile() {
  const [searchParams] = useSearchParams();

  const role = localStorage.getItem("role");
  const isStudent = role === "student";

  const [image, setImage] = useState("");

  // 👉 NEW: state for autofill
  const [name, setName] = useState("");

  // 👉 NEW: read LinkedIn data from URL
  useEffect(() => {
    const first_name = searchParams.get("first_name");
    const last_name = searchParams.get("last_name");
    const picture = searchParams.get("picture");

    if (first_name && last_name) {
      setName(`${first_name} ${last_name}`);
    }
    if (picture) {
      setImage(picture);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // LinkedIn login
  const handleLinkedInLogin = () => {
    window.location.href = "http://localhost:4000/auth/linkedin/login";
  };

  return (
    <>
    <section>
      <PageHeader />

      {image && (
        <img
          src={image}
          alt="Profile picture"
          style={{ width: "150px", borderRadius: "50%" }} />
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
          placeholder={isStudent ? "e.g. Digital Design at Yrgo" : "Your company"} />
        <button type="submit">Start the stalking</button>
      </form>
    </section>
    </>
  );
}
