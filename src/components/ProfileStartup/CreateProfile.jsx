import { useEffect, useState } from "react";
import Styles from "./CreateProfile.module.css";
import { PageHeader } from "./StartupHeader";
import { getInitials } from "../../utils/helpers";
import linkedIn from "../../assets/linkedIn.svg";
import { useFormValidation } from "../../hooks/FormValidation";

export function CreateProfile() {
  const role = localStorage.getItem("role");
  const isStudent = role === "student";

  // form input states
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fun_fact, setFunfact] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const { errors, validateForm, clearError } = useFormValidation();

  // fetch user data from LinkedIn
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setName(`${data.first_name} ${data.last_name}`);
          setImage(data.picture || "");
          if (data.description) setDescription(data.description);
          if (data.fun_fact) setFunfact(data.fun_fact);
          if (data.email) setEmail(data.email);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch /me failed:", err);
        setLoading(false);
      });
  }, []);

  // handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm({ description, fun_fact })) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, description, fun_fact, email }),
    });

    if (res.ok) {
      window.location.href = "/feed";
    } else {
      console.error("Failed to save profile");
    }
  };

  // redirect to LinkedIn login
  const handleLinkedInLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/linkedin/login`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <PageHeader />
      {image ? (
        <img
          src={image}
          alt="Profile picture"
          className={Styles.profileImage}
        />
      ) : (
        name && (
          <div className="initials">
            {getInitials(name.split(" ")[0], name.split(" ")[1])}
          </div>
        )
      )}

      <form className={Styles.inputInfo} onSubmit={handleSubmit}>
        {!name && (
          <>
            <button
              type="button"
              className={Styles.linkedinBtn}
              onClick={handleLinkedInLogin}
            >
              <img src={linkedIn} alt="linkedIn logo" />
              Sign in with LinkedIn
            </button>
            <p>
              Sign in with LinkedIn to create your profile to connect with
              (stalk) the people at the event!
            </p>
          </>
        )}

        {name && (
          <>
            <div className={Styles.greeting}>
              <label>Welcome,</label>
              <p>{name}</p>
            </div>

            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              type="email"
              placeholder="your emailadress"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="company">
              {isStudent ? "Program" : "Company"} <sup>*</sup>
            </label>
            <input
              id="company"
              name={isStudent ? "program" : "company"}
              value={description}
              type="text"
              placeholder={
                isStudent ? "e.g. Digital Design at Yrgo" : "Your company"
              }
              onChange={(e) => {
                setDescription(e.target.value);
                clearError("description");
              }}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}

            <label htmlFor="fun_fact">
              Fun fact <sup>*</sup>
            </label>
            <input
              id="fun_fact"
              value={fun_fact}
              type="text"
              placeholder="e.g. Ask me about my favorite superhero"
              onChange={(e) => {
                setFunfact(e.target.value);
                clearError("fun_fact");
              }}
            />
            {errors.fun_fact && <p className="error">{errors.fun_fact}</p>}

            <button type="submit">Start the stalking</button>
          </>
        )}
      </form>
    </section>
  );
}
