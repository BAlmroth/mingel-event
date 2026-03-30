import styles from "./RoleCard.module.css"

export function RoleCard({ src, alt, title, description, onClick }) {
  
  return (
    <div onClick={onClick} className={styles.rolecard}>
      <img src={src} alt={alt} />
      <div className={styles.cardinfo}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
