import React,{useState} from 'react'

function Feedback({handleChange,obj,question,name}) {
const [flag,setFlag]= useState(false);

    return (
        <div className="response">
          
        <div className="question">
              <p className='inputTitle'> {question}</p>
              <div className="radio">
              <div><input type="radio" onChange={handleChange} name={name} value='Excellent' checked={obj[name]=="Excellent"} required/><label>Excellent</label></div>
              <div><input type="radio" onChange={handleChange} name={name} value='Good' checked={obj[name]=="Good"} required/><label>Good</label></div>
              <div><input type="radio" onChange={handleChange} name={name} value='Fair' checked={obj[name]=="Fair"} required/><label>Fair</label></div>
              <div><input type="radio" onChange={handleChange} name={name} value='Bad' checked={obj[name]=="Bad"} required/><label>Bad</label></div>
              
              </div>
              </div>
          </div>
    )
    
}
export default Feedback
