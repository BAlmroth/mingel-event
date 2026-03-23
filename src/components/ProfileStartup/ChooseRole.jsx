import styles from "./ChooseRole.module.css";
import { RoleCard } from "./RoleCard";
import StudentImg from "../../assets/Student.svg";
import IndustryImg from "../../assets/Industry.svg";

export function ChooseRole() {
  return (
    <>
      <section className="roles">
        <div className={styles.roleInfo}>
          <h4>Register to</h4>
          <h1>Stalk the people at the event</h1>
          <h4>I AM A...</h4>
        </div>

        <RoleCard src={StudentImg} alt="student logo" title="Student" description="I'm here to learn and connect" />
        <RoleCard src={IndustryImg} alt="industry logo" title="Industry" description="I'm here to meet talent" />
      </section>
    </>
  );
}
