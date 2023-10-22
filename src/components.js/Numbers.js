import react from "react";
import shortid from "shortid"
import styles from "../styles.module.css";
export default function Numbers({num,dispatch}){

    const clickedNum=(e)=>{
            if (e.target.value ==="DEL"){
                dispatch({type: 'delete'})   
            }else{
            dispatch({type: 'writenums', payload:{digit:e.target.value}})
            }
        }
   
    return <>
       <button  onClick={clickedNum} value={num} className={styles.griditem}>{num}</button>
    </>
}