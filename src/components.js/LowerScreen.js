import react from "react";
import styles from "../styles.module.css";

export default function LowerScreen({firstOperande,operator}){
   
   return < div className={styles.numberscreen} >
   {firstOperande} {operator}
    </div>
}
