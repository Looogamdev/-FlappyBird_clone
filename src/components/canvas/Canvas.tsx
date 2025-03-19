import styles from "./canvas.module.css";
import Bird from "../bird/Bird"

export const Canvas = () => {
  return (
    <div>
      <div className={styles.cena}>
      <Bird/>
      </div>
    </div>
  )
}
