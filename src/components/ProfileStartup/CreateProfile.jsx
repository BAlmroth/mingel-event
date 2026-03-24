import { useSearchParams } from "react-router-dom";
import Styles from "./CreateProfile.module.css";

export function CreateProfile() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const isStudent = role === "student";
  
  const handleSubmit = (e) => {
    e.preventDefault(); //hoppa inte till en ny sida
  };

  return (
    <section>
      <div className={Styles.profileInfo}>
        <h4>Register to</h4>
        <h1>Create Profile</h1>
      </div>
      <div>
        <p>Selected role: {role}</p>
      </div>

      <form className={Styles.inputInfo} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" />

        <label htmlFor="company">{isStudent ? "Program" : "Company"}</label>
        <input
          id="company"
          name={isStudent ? "program" : "company"}
          type="text"
          placeholder={isStudent ? "e.g. Digital Design at Yrgo" : "Your company"}
        />

        <label htmlFor="linkedin">LinkedIn</label>
        <input id="linkedin" name="linkedin" type="url" />

        <button type="submit">Start the stalking</button>
      </form>
    </section>
  );
}
