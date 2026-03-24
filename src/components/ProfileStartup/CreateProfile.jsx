import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./CreateProfile.module.css";
import { PageHeader } from "./StartupHeader";

export function CreateProfile() {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role");
  const isStudent = role === "student";

  // 👉 NEW: state for autofill
  const [name, setName] = useState("");

  // 👉 NEW: read LinkedIn data from URL
  useEffect(() => {
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");

    if (firstName && lastName) {
      setName(`${firstName} ${lastName}`);
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
    <section>
      <PageHeader />

      <form className={Styles.inputInfo} onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={name} // 👈 autofill here
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="company">
          {isStudent ? "Program" : "Company"}
        </label>
        <input
          id="company"
          name={isStudent ? "program" : "company"}
          type="text"
          placeholder={
            isStudent ? "e.g. Digital Design at Yrgo" : "Your company"
          }
        />

        <button type="button" onClick={handleLinkedInLogin}>
          Log in with LinkedIn
        </button>

        <button type="submit">Start the stalking</button>
      </form>
    </section>
  );
}