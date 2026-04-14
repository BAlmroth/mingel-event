import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedIds, setLikedIds] = useState([]);

  // fetch all
  useEffect(() => {
    const fetchData = async () => {
      const { data: allData, error: allError } = await supabase
        .from("users")
        .select("*");

      if (!allError) setAllUsers(allData);

      // fetch your info on login
      const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }

      const linkedinUser = await res.json();

      if (!res.ok || !linkedinUser) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("linkedin_id", linkedinUser.linkedin_id)
        .maybeSingle();

      if (!error && data) {
        // safe info while logged in
        setUser(data);

        // fetch the users liked profiles
        const { data: likesData } = await supabase
          .from("likes")
          .select("liked_id")
          .eq("liker_id", data.id);
        if (likesData) setLikedIds(likesData.map((l) => l.liked_id));
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // update profile
  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === updatedData.id ? { ...u, ...updatedData } : u)),
    );
  };

  // like profile
  const likeUser = async (likedId) => {
    if (!user) return;
    const { error } = await supabase
      .from("likes")
      .insert({ liker_id: user.id, liked_id: likedId });
    if (!error) setLikedIds((prev) => [...prev, likedId]);
  };

  // unlike profile
  const unlikeUser = async (likedId) => {
    if (!user) return;
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("liker_id", user.id)
      .eq("liked_id", likedId);
    if (!error) setLikedIds((prev) => prev.filter((id) => id !== likedId));
  };

  const logOut = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setLikedIds([]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        likedIds,
        likeUser,
        unlikeUser,
        loading,
        updateUser,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
