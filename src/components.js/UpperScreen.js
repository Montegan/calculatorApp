import react from "react";
import styles from "../styles.module.css";
export default function UpperScreen({secondoperand, operator}){
    return <>
    <p className={styles.topscreen}>
            {secondoperand}{operator}
             </p>     
      
    </>
}