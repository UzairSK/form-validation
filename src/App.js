import React, {useState} from 'react';
import './App.css';
import Navbar from './Navbar.js';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Table from './Table.js';
import Form from './Form.js';

function App() {
 const [tableData, setTableData] = useState([]);
  return (
    <div className="App">
      {/* Using router to navigate between Form and Table tabs on the navigation bar */}
      <Router>
       <Navbar />
          <Switch>
          <Route path="/table">
              <Table tableData={tableData} setTableData={setTableData}/>
          </Route>
          <Route path="/">
              <Form setTableData={setTableData}/>
          </Route>
          </Switch>
      </Router>
    
    </div> 
  );
}

export default App;
