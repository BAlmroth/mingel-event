import { RoleCard } from "./RoleCard";
import StudentImg from "../../assets/Student.svg";
import IndustryImg from "../../assets/Industry.svg";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./StartupHeader";

export function ChooseRole() {
  const navigate = useNavigate();

  return (
    <>
      <section>
              <PageHeader/>

        <RoleCard src={StudentImg} alt="student logo" title="Student" description="I'm here to learn and connect" onClick={() => navigate("/create-profile?role=student")} />
        <RoleCard src={IndustryImg} alt="industry logo" title="Industry" description="I'm here to meet talent" 
        onClick={() => navigate("/create-profile?role=industry")}/>
      </section>
    </>
  );
}
