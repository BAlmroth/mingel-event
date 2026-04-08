import { useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./MyProfile.module.css";

export function EditMyProfile() {
  const { user, loading, updateUser } = useUser();
  const navigate = useNavigate();

  const [role, setRole] = useState(user?.role || "");
  const [description, setDescription] = useState(user?.description || "");
  const [funFact, setFunFact] = useState(user?.fun_fact || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, description, fun_fact: funFact }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      updateUser(updatedUser);
      navigate("/profile");
    } else {
      console.error("Failed to update profile");
    }
    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

  return (
    <section className={styles.profilesection}>
      <div className={styles.profileheader}>
        <h5>EDIT PROFILE</h5>
        <h1>Update your info</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.editForm}>
        <label htmlFor="role">Role</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="industry">Industry</option>
        </select>

        <label htmlFor="description">Program / Company</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Digital Design at Yrgo"
        />

        <label htmlFor="funFact">Fun Fact</label>
        <input
          id="funFact"
          type="text"
          value={funFact}
          onChange={(e) => setFunFact(e.target.value)}
          placeholder="e.g. Ask me about my favorite superhero"
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button type="button" onClick={() => navigate("/profile")} className={styles.cancelBtn}>
          Cancel
        </button>
      </form>
    </section>
  );
}