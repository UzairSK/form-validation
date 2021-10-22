import React, {useState} from 'react'
import "./Form.css";
import Feedback from './Feedback';
import Input from './Input'

function Form({setTableData}) {
   
    const [obj, setObj] = useState({
        name: "",
        email: "",
        phone: "",
        response1: "",
        response2: "",
        response3: "",
        response4: ""
    });
    
    const [nameFlag, setNameFlag]= useState({flag:false,message:""});
    const [emailFlag, setEmailFlag]= useState({flag:false,message:""});
    const [phoneFlag, setPhoneFlag]= useState({flag:false,message:""});
    const [responses, setResponses]= useState({
        response1:false,
        response2:false,
        response3:false,
        response4:false
    });

    function handleChange(event) {
        const { name, value } = event.target;
       
        console.log(name, value);
      
        if(name==='name'&&value===''){
            setNameFlag({flag:true,
            message:"Error: This is a mandatory field"});
        }else if(name==='name'&&value.length>0){
            setNameFlag({flag:false,
                message:""});
        }
       
       
        if(name==='email'&&value===''){
            setEmailFlag({flag:true,
            message:"Error: This is a mandatory field"});
        }
        else if(name==='email'&&value.length>0){
            setEmailFlag({flag:false,message:""});
        }
       
        if(name==='phone'&&value===''){
            setPhoneFlag({flag:true,
            message:"Error: This is a mandatory field"});
        }
        else if(name==='phone'&&value.length>0){
            setPhoneFlag({flag:false,message:""});
        }
      
        
        setObj(prevObj => {
            return {
                ...prevObj,
                [name] : value
            };
        });
     }
     const validate=() =>{
        let flag=0;
        var format = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,<>\/?~]/;
        setResponses({
        response1:obj.response1==""?true:false,
        response2:obj.response2==""?true:false,
        response3:obj.response3==""?true:false,
        response4:obj.response4==""?true:false,
        });
        
        if(!{
            response1:false,
            response2:false,
            response3:false,
            response4:false
        }===responses) {flag++;} 
        
        if(obj.name=='') { 
            setNameFlag({flag:true, message:"Error: This is a mandatory field"});
            flag++;
        }   
        else if(obj.name.length<3){
            setNameFlag({flag:true, message:"Length of name is very small"});
            flag++;
        } 
        else if(format.test(obj.name)) { 
            setNameFlag({flag:true, message:"Name must not contain special symbols"});
            flag++;
        }
        
        if(obj.email==''){
            setEmailFlag({flag:true, message:"Error: This is a mandatory field"});
            flag++;
        }
        else if(!(obj.email.includes(".com")||obj.email.includes(".org")||obj.email.includes(".net"))){
            setEmailFlag({flag:true, message:"Email must contain a domain eg: .com "});
            flag++;
        }

        if(obj.phone==""){
            setPhoneFlag({flag:true, message:"Error: This is a mandatory field"});
            flag++;
        }
        else if(obj.phone.length>12){
            setPhoneFlag({flag:true, message:"Phone number must be 12 digits long"});
            flag++;
        }
        console.log(flag);
       if(flag==0){
        return true;
       }   
       else{
           return false;
       }
     }
    const handleSubmit = (event) =>{
        if(validate()){
            //console.log(obj);

            setObj({
                name: "",
                email: "",
                phone: "",
                response1: "",
                response2: "",
                response3: "",
                response4: ""
            });
            

            
            const items = (() => {
                const fieldValue = localStorage.getItem('myobj');
                return fieldValue === null
                  ? []
                  : JSON.parse(fieldValue);
              })();
              items.push(obj);
              localStorage.setItem('myobj', JSON.stringify(items));
              setTableData(JSON.parse(localStorage.getItem('myobj')));
              
            event.preventDefault();
        }
        else{
            event.preventDefault();
        }
       
    }
    return (
        <div className="form">
            <div className="formTitle">
            <p id="title">Aromatic Bar</p>
            <p>We are committed to providing you with the best dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you.</p>
            </div>

            <form onSubmit={handleSubmit}> 
            <div className="formContent">
            <div className="row">

           
            <div className="column">
           
            
            <Input flagType={nameFlag} handleChange={handleChange} obj={obj.name} name="name" text="Customer Name"type='text' />
            <Input flagType={emailFlag} handleChange={handleChange} obj={obj.email} name="email" text="Email" type='text'/>
                 {/* <div className="inputField">  
                    <p className='inputTitle'>Customer Name</p>
                    <input name='name'
                     type='text'
                     style={nameFlag.flag?error:null}
                     onBlur={handleChange}
                    onChange={handleChange}
                    value={obj.name}></input>
                   {nameFlag.flag?<p className="warning">{nameFlag.message}</p>:null}
                </div>

                <div className="inputField">
                    <p className='inputTitle'>Email</p>
                    <input name='email' 
                    type='text'
                    style={emailFlag.flag?error:null}
                    onBlur={handleChange}
                    onChange={handleChange}
                    value={obj.email}></input>
                    {emailFlag.flag?<p className="warning">{emailFlag.message}</p>:null}
                </div> */}

               
            </div>
                     
            <div className="column">
            <Input flagType={phoneFlag} handleChange={handleChange} obj={obj.phone} name="phone" text="Phone" type="number" />
                {/* <div className="inputField">
                    <p className='inputTitle'>Phone</p>
                    <input name='phone' 
                    type='number'
                    style={phoneFlag.flag?error:null}
                    onChange={handleChange}
                    onBlur={handleChange}
                    value={obj.phone}
                    maxLength="10"></input>
                    {phoneFlag?<p className="warning">{phoneFlag.message}</p>:null}
                </div> */}
            </div>    
            
            </div> 
            <div className="questionaire">
            <Feedback handleChange={handleChange} responses={responses} question="Please rate the quality of the service you received from your host." name='response1'/>
            <Feedback handleChange={handleChange} responses={responses} question="Please rate the quality of your beverage." name='response2'/>
            <Feedback handleChange={handleChange} responses={responses} question="Was our restaurant clean?" name='response3'/>
            <Feedback handleChange={handleChange} responses={responses} question="Please rate your overall dining experience." name='response4'/>
            
            </div>
            <div className="btn">
            <button id="submitButton">Submit</button>
            </div>
                
            </div>
            </form>
        </div>
    )
}
export default Form
