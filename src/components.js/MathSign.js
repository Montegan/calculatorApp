import react from "react";
import shortid from "shortid";
import styles from "../styles.module.css";
export default function MathSign({sign,dispatch}){
   const operationsign=(e)=>{
        dispatch({type:'operations', payload:{operators:e.target.value}})
   }
    return <>
       <button onClick={operationsign} value={sign} className={styles.griditem}>{sign}</button>
    </>

    
}