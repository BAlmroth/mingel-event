import { useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import styles from "./EditMyProfile.module.css";
import { useFormValidation } from "../../hooks/FormValidation";

export function EditMyProfile() {
  const { user, loading, updateUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [description, setDescription] = useState(user?.description || "");
  const [funFact, setFunFact] = useState(user?.fun_fact || "");
  const [saving, setSaving] = useState(false);
  
  const { errors, validateForm, clearError } = useFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm({ description, funFact })) return;
    
    setSaving(true);

    const { data, error } = await supabase
      .from("users")
      .update({
        description,
        fun_fact: funFact,
        email,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (!error && data) {
      updateUser(data);
      navigate("/profile");
    } else {
      console.error("Failed to update profile", error);
    }
    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

  return (
    <section className={styles.editSection}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h5>EDIT</h5>
          <h1>Personal Card!</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            className={styles.input}
          />
          
          <label className={styles.label}>Program <sup>*</sup></label>
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearError("description");
            }}
            placeholder="e.g. Digital Design at Yrgo"
            className={styles.input}
          />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}

          <label className={styles.label}>Fun Fact <sup>*</sup></label>
          <input
            type="text"
            value={funFact}
            onChange={(e) => {
              setFunFact(e.target.value);
              clearError("funFact");
            }}
            placeholder="A icebreaker to talk about"
            className={styles.input}
          />
          {errors.funFact && (
            <p className="error">{errors.funFact}</p>
          )}

          <div className={styles.buttons}>
            <button 
              type="button" 
              onClick={() => navigate("/profile")} 
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving} 
              className={styles.saveBtn}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}