import { useState,useReducer} from "react";
import LowerScreen from "./components.js/LowerScreen";
import MathSign from "./components.js/MathSign";
import Numbers from "./components.js/Numbers";
import Twospan from "./components.js/Twospan";
import UpperScreen from "./components.js/UpperScreen";
import styles from "./styles.module.css";

function reducer(state,action){
  switch(action.type){
    case 'writenums':
      if (state.overwrite){
        return {...state, firstOperand: action.payload.digit,
        overwrite:false }
      }

      if(action.payload.digit === "0" && state.firstOperand === "0"){
      return state;
      } else if(action.payload.digit === "." && state.firstOperand.includes(".") ){
        return state;
        }
      else{

        if(action.payload.digit !== "." && state.firstOperand ==="0"){
          return {...state,
            firstOperand: `${action.payload.digit}`,}
      } 
      else if(action.payload.digit === "." && state.firstOperand === ("0" )){
        return {...state,
          firstOperand: `0${action.payload.digit}`,}
      }
      else if(action.payload.digit === "." && state.firstOperand === ( "")){
        return {...state,
          firstOperand: `0${action.payload.digit}`,}
      }
      else{

        return {...state,
          firstOperand: `${state.firstOperand || ""}${action.payload.digit}`,}
      }
    }
   
    case 'operations':

      if (state.firstOperand === "0" && state.secondoperand == null ){
        return state
      }
      else if (state.secondoperand == null  ){
       return {...state, 
        operator:`${action.payload.operators}`, 
        secondoperand: (state.firstOperand) ,
        firstOperand:""}
      }
      else if (state.firstOperand === "" && state.secondoperand != null){
        return {...state, 
          operator:`${action.payload.operators}`, 
          secondoperand: (state.secondoperand),
          firstOperand:""} 
      }
      else if (state.firstOperand !=null  && state.operator == null){
        return {...state, 
          operator:`${action.payload.operators}`, 
          secondoperand: (state.firstOperand),
          firstOperand:""} 
      }
      else {
        return {...state, 
          operator:`${action.payload.operators}`, 
          secondoperand: calculated(state) ,
          firstOperand:""}
      }
      
    case 'clear':
     return {...state, firstOperand: `${ 0}` , secondoperand:null, operator:null}
    
    case 'calculate':
      if (state.operator == null || state.firstOperand === "" || state.secondoperand==null){
      
        return state; 
        }
      else if (state.operator != null){
      
      return {...state,
         firstOperand :  calculated(state), 
         secondoperand:`${formatOperand(state.secondoperand)}${state.operator}${formatOperand(state.firstOperand)}`,
         operator:null,
         overwrite:true
        }; 
      }
      
      else{
        return {...state, firstOperand :  calculated(state), secondoperand:`${state.firstOperand}${state.operator}${state.firstOperand}`,operator:null }; 
      }
    case 'delete':
        if (state.overwrite){
        return {...state,overwrite:false, firstOperand:null,secondoperand:null
        }
        }
        else if (state.firstOperand===null && state.secondoperand===null){
        return state;
        }
        else{
          return{...state, firstOperand:state.firstOperand.slice(0,-1)}
        }

    }
       
} 


function calculated({firstOperand,secondoperand,operator}){
    
  const firstnum= parseFloat(firstOperand);
  const secndnum= parseFloat(secondoperand);
  
  let summ = "";

  switch (operator){

    case "+":
     summ = secndnum  + firstnum  ;
     break;
    case "*":
     summ =   secndnum * firstnum;
     break;
    case "-":
      summ =   secndnum - firstnum;
      break;
    case "÷":
        summ =  secndnum  / firstnum ;
        break;   
  }

  return summ.toString();


}

const IntegerFormatter= new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0,
})

function formatOperand(operande){
  if (operande==null) return 
  const [integer,decimal]= operande.split('.')
  if (decimal == null) return IntegerFormatter.format(integer)
  return `${IntegerFormatter.format(integer)}.${decimal}`
}
function App() {
  
  const [{firstOperand,secondoperand,operator},dispatch] = useReducer(reducer,{firstOperand:"0"})
  return (

    <div className="App">
    <h1> Calculator.net</h1>
     <div className={styles.gridcontainer}>
       <div className={styles.screenContainer}>
             <UpperScreen  secondoperand= {secondoperand} operator={operator}></UpperScreen>
             <LowerScreen  firstOperande={formatOperand(firstOperand)} />
       </div>
       <Twospan Twospan={"AC"} dispatch={dispatch}></Twospan>
       <Numbers num={"DEL"} dispatch={dispatch}></Numbers>
       <MathSign sign={"+"} dispatch={dispatch}></MathSign>  
       <Numbers num={1} dispatch={dispatch} ></Numbers>  
       <Numbers num={2} dispatch={dispatch} ></Numbers>
       <Numbers num={3} dispatch={dispatch} ></Numbers>   
       <MathSign sign={"*"} dispatch={dispatch}></MathSign> 
       <Numbers num={4} dispatch={dispatch} ></Numbers>  
       <Numbers num={5} dispatch={dispatch} ></Numbers>
       <Numbers num={6} dispatch={dispatch} ></Numbers> 
       <MathSign sign={"-"} dispatch={dispatch}></MathSign> 
       <Numbers num={7} dispatch={dispatch} ></Numbers>  
       <Numbers num={8} dispatch={dispatch} ></Numbers>
       <Numbers num={9} dispatch={dispatch} ></Numbers> 
       <MathSign sign={"÷"} dispatch={dispatch}></MathSign>
       <Numbers num={"."} dispatch={dispatch} ></Numbers> 
       <Numbers num={0} dispatch={dispatch} ></Numbers>
       <Twospan Twospan={"="} dispatch={dispatch}></Twospan>
       

    </div> 
    </div>
  )
}

export default App;
