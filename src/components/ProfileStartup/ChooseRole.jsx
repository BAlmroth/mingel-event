import { RoleCard } from "./RoleCard";
import StudentImg from "../../assets/StudentRole.svg";
import IndustryImg from "../../assets/IndustryRole.svg";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./StartupHeader";

export function ChooseRole() {
  const navigate = useNavigate();

  return (
    <>
      <section>
        <PageHeader />
        <RoleCard
          src={StudentImg}
          alt="student logo"
          title="Student"
          description="I'm here to learn and connect"
          onClick={() => {
            localStorage.setItem("role", "student");
            navigate("/create-profile");
          }}
        />
        <RoleCard
          src={IndustryImg}
          alt="industry logo"
          title="Industry"
          description="I'm here to meet talent"
          onClick={() => {
            localStorage.setItem("role", "industry");
            navigate("/create-profile");
          }}
        />
      </section>
    </>
  );
}
