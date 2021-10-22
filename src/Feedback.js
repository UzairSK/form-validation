import React from 'react'

function Feedback({handleChange,responses,question,name}) {
    return (
        <div className="response">
        <div className="question">
              <p className='inputTitle'> {question}</p>
              <div className="radio">
              <div><input type="radio" onChange={handleChange} name={name} value='Excellent'/><label>Excellent</label></div>
              <div><input type="radio" onChange={handleChange} name={name} value='Good'/><label>Good</label></div>
              <div><input type="radio" onChange={handleChange} name={name} value='Fair'/><label>Fair</label></div>
              <div><input type="radio" onChange={handleChange} name={name} value='Bad'/><label>Bad</label></div>
              </div>
              </div>
              {responses.response1 ? <p className="warning">Please select one among the options</p>:null}
          </div>
    )
}

export default Feedback
