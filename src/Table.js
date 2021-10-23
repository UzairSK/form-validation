import React, {useEffect,useState} from 'react';
import "./Table.css";
function Table() {
    const[tableData,setTableData]=useState([]);
    
    useEffect(() => { //sets table data when rendering page first time
      setTableData( (() => {
        const fieldValue = localStorage.getItem('myobj');
        return fieldValue === null
          ? []
          : JSON.parse(fieldValue);
      })());
      },[]);
    return (
        <div className="table-page">

            <h1 className="all-feedback">All Feedback</h1>
           <div className="table">
             {/* if no data is present in the browsers object then displays 'No data entered' else displays the tables with all entries */}
            {tableData.length==0?<h1>No data entered</h1>:<table>
                   <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Quality of service</th>
                        <th>Quality of beverage</th>
                        <th>Cleanliness</th>
                        <th>Overall dining experience</th>
                   </tr>
                  {/* maps table data and displays object details in the table row */}
                   {tableData.map((item) => (
                      <tr key={item.id}>
                        {Object.values(item).map((val) => (
                          <td>{val}</td>
                        ))}
                      </tr>
                    ))}
               </table>
}
           </div>
        </div>
    )
}

export default Table
