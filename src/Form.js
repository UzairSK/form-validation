import React, { useState } from 'react'
import "./Form.css";
import Feedback from './Feedback';
import Input from './Input'

function Form({ setTableData }) {
  
    const [obj, setObj] = useState({ name: "", email: "", phone: "", response1: "", response2: "", response3: "", response4: "" });
    const [nameFlag, setNameFlag] = useState({ flag: false, message: "" });
    const [emailFlag, setEmailFlag] = useState({ flag: false, message: "" });
    const [phoneFlag, setPhoneFlag] = useState({ flag: false, message: "" });
 

    function handleChange(event) { //used to hadle on change event by input tags
        const { name, value, checked } = event.target;

        if (name === 'name' && value === '') {  //set error message if input of 'name'  is set to ''
            setNameFlag({
                flag: true,
                message: "Error: This is a mandatory field"
            });
        } else if (name === 'name' && value.length > 0) { //unset error message if length of input 'name' is greater than 0
            setNameFlag({
                flag: false,
                message: ""
            });
        }


        if (name === 'email' && value === '') {//set error message if input of 'email'  is set to ''
            setEmailFlag({              
                flag: true,
                message: "Error: This is a mandatory field"
            });
        }
        else if (name === 'email' && value.length > 0) {//unset error message if length of input 'name' is greater than 0
            setEmailFlag({ flag: false, message: "" });
        }

        if (name === 'phone' && value === '') {//set error message if input of 'phone'  is set to ''
            setPhoneFlag({
                flag: true,
                message: "Error: This is a mandatory field"
            });
        }
        else if (name === 'phone' && value.length > 0) {//unset error message if length of input 'phone' is greater than 0
            setPhoneFlag({ flag: false, message: "" });
        }


        setObj(prevObj => { //reflect changes in the object when the values are changed.
            return {
                ...prevObj,
                [name]: value
            };
        });

        console.log(obj);
    }

    const validate = () => {
        let flag=0;
        
        var format = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,<>\/?~]/;

        if (obj.name == '') {   //check if the name is set to '' at submit time
            setNameFlag({ flag: true, message: "Error: This is a mandatory field" });
            flag++;
        }
        else if (obj.name.length < 3) {//length of name should be more than 3 characters
            setNameFlag({ flag: true, message: "Length of name is very small" });
            flag++;
        }
        else if (format.test(obj.name)) {// name must not conntain any special symbol
            setNameFlag({ flag: true, message: "Name must not contain special symbols" });
            flag++;
        }

        if (obj.email == '') {// email should not be ''
            setEmailFlag({ flag: true, message: "Error: This is a mandatory field" });
            flag++;
        }
        else if (!(obj.email.includes(".com") || obj.email.includes(".org") || obj.email.includes(".net"))) {// email must contain a domain specifically .org .com .net
            setEmailFlag({ flag: true, message: "Email must contain a domain eg: .com " });
            flag++;
        }

        if (obj.phone == "") {  //phone input field should not be empty
            setPhoneFlag({ flag: true, message: "Error: This is a mandatory field" });
            flag++;
        }
        else if (obj.phone.length > 12) {// length of phone number must not be more than 12 characters
            setPhoneFlag({ flag: true, message: "Phone number must be 12 digits long" });
            flag++;
        }
       
        if (flag==0) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleSubmit = (event) => {
        if (validate()) { //if name,email and phone fields are validated then store its value in browsers storage
            
            setObj({ name: "", email: "", phone: "", response1: "", response2: "", response3: "", response4: "" });
            //set input fields value back to empty
            const items = (() => {  //create array of objects named 'items'
                const fieldValue = localStorage.getItem('myobj');
                return fieldValue === null
                    ? []
                    : JSON.parse(fieldValue);
            })();

            items.push(obj);//store value of current inputs in items array
            localStorage.setItem('myobj', JSON.stringify(items));   //store in browsers local storage

            setTableData(JSON.parse(localStorage.getItem('myobj')));    //update the table data

            event.preventDefault();
        }
        else {
            event.preventDefault();
        }

    }
    return (
        <div className="form">
            <div className="formTitle">
                <p id="title">Aromatic Bar</p>
                <p>We are committed to providing you with the best dining experience possible, so we welcome your comments. Please fill out this questionnaire. Thank you.</p>
            </div>
            {/*handleSubmit function to validate fields  */}
            <form onSubmit={handleSubmit}>  
                <div className="formContent">
                    <div className="row">

                        {/* display input fields namely name, email, phone */}
                        <div className="column">
                            <Input flagType={nameFlag} handleChange={handleChange} obj={obj.name} name="name" text="Customer Name" type='text' />
                            <Input flagType={emailFlag} handleChange={handleChange} obj={obj.email} name="email" text="Email" type='text' />

                        </div>

                        <div className="column">
                            <Input flagType={phoneFlag} handleChange={handleChange} obj={obj.phone} name="phone" text="Phone" type="number" />
                        </div>

                    </div>

                    <div className="questionaire">
                        {/* displays 4 questions each with 4 options */}
                        <Feedback handleChange={handleChange} obj={obj} question="Please rate the quality of the service you received from your host." name='response1'/>
                        <Feedback handleChange={handleChange} obj={obj} question="Please rate the quality of your beverage." name='response2'/>
                        <Feedback handleChange={handleChange} obj={obj} question="Was our restaurant clean?" name='response3'/>
                        <Feedback handleChange={handleChange} obj={obj} question="Please rate your overall dining experience."  name='response4'/>
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
