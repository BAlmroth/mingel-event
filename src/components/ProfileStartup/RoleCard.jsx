export function RoleCard({ title, description, onClick }) {
  return (
    <div onClick={onClick} className="role">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
