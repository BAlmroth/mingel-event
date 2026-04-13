import { useState } from "react";
import Styles from "./MingleFeed.module.css";
import { MingleCard } from "./MingleCard";
import { useUser } from "../../hooks/UserContext";
import searchImage from "../../assets/search.svg";

const filters = ["All", "Students", "Industry"];

export function MingleFeed() {
  const { allUsers, loading } = useUser();
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  // map filter names to database role values
  const roleMap = { Students: "student", Industry: "industry" };

  // filter users by role and search query
  const filtered = allUsers
    .filter((user) => {
      if (active === "All") return true;
      return user.role === roleMap[active];
    })
    .filter((user) => {
      const searchLower = search.toLowerCase();

      const fullName =
        `${user.first_name ?? ""} ${user.last_name ?? ""}`.toLowerCase();
      const description = (user.description ?? "").toLowerCase();

      return (
        fullName.includes(searchLower) || description.includes(searchLower)
      );
    });

  return (
    <>
      <section className={Styles.top}>
        <div className={Styles.mingleHeader}>
          <div className={Styles.live}>
            <span className={Styles.dot}></span>
            <p>Live Room</p>
          </div>
          <h2>Mingle Feed</h2>
        </div>

        {/* search */}
        <div className={Styles.searchWrapper}>
          <img src={searchImage} alt="search" className={Styles.searchIcon} />

          <input
            type="text"
            placeholder="Search name, company or program"
            value={search}
            onChange={(e) => setSearch(e.target.value.trim().slice(0, 100))}
            className={Styles.searchInput}
          />
        </div>

        {/* filter */}
        <div className={Styles.filter}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`${Styles.filterButton} ${
                active === filter ? Styles.active : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className={Styles.MingleFeed}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filtered.map((person) => (
              <MingleCard key={person.id} user={person} />
            ))}
            <small className={Styles.count}>
              {filtered.length} in the room
            </small>
          </>
        )}
      </section>
    </>
  );
}
