import react from "react";
import shortid from "shortid";
import styles from "../styles.module.css";
export default function Twospan({Twospan,dispatch}){

    const operate=(e)=>{
        if(e.target.value === "AC"){
        dispatch({type:'clear'})
        }else if(e.target.value === "="){
        dispatch({type:'calculate'})
        }
    }
    return <>
       <button onClick={operate} value={Twospan} className={styles.span_two}>{Twospan}</button>
    </>
    
}