import React from 'react'

function Input({flagType,handleChange,obj,name,text,type}) {
    const error={border: '1px solid red'};
    return (
        <div className="inputField">  
                    <p className='inputTitle'>{text}</p>
                    <input name={name}
                     type={type}
                     style={flagType.flag?error:null}
                     onBlur={handleChange}
                    onChange={handleChange}
                    value={obj}
                    ></input>
                   {flagType.flag?<p className="warning">{flagType.message}</p>:null}
                </div>
    )
}

export default Input
