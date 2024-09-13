import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
import './App.css';

// Main Application Component
export default function App() {
  // A blank customer object to reset the form or to initializae the form for "Add" mode
  const blankCustomer = { id: -1, name: '', email: '', password: '' };

  // React State: store the list of customers and the currently selected customer/form data
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  // Determine if we are adding a new customer or updating an existing one based on the selected formObject's id
  const mode = (formObject.id >= 0) ? 'Update' : 'Add';

  // Fetch the customer data from the backend
  useEffect(() => { 
    fetchCustomers();
   }, []);

   // Fuction to fetch all customers from the database and update the customers state
  const fetchCustomers = () => {
    setCustomers(getAll());
  };

  // Function to handle when a customer in the list is clicked
  const handleListClick = (item) => {
    if(formObject.id === item.id){
      setFormObject(blankCustomer);
    }else{
      setFormObject(item);
    }
  };  
 
  // Function to handle changes in the form input fields
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormObject((prev) => ({...prev, [name]: value }));
  };

  // Function to handle the cancel button click
  const handleCancelClick = () => {
    setFormObject(blankCustomer);
  };

  // Function to handle the delete button click
  const handleDeleteClick = () => {
    if(formObject.id >= 0){
      deleteById(formObject.id);
      setFormObject(blankCustomer);
      fetchCustomers();
    }
  };   

  // Function to handle the save button click
  const handleSaveClick = () => {
    if (mode === 'Add') {
      post(formObject);
    }else{
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
    fetchCustomers();
  }

  return (
    <div>
      {/* Customer List */}
      <div className="boxed" >
        <h4>Customer List</h4>
        <table id="customer-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
                <tr 
                key={item.id} 
                className={ item.id === formObject.id ?'selected': ''}
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                </tr>
                ))}
          </tbody>
        </table>
    </div>

    {/* Customer Add/Update Form */}
    <div className="boxed">
        <h4>{mode}</h4>
      <form >
        <table id="customer-add-update" >
          <tbody>
            <tr>
              <td className={'label'} >Name:</td>
              <td>
                <input
                type="text"
                name="name"
                value={formObject.name}
                onChange={handleInputChange}
                placeholder="Customer Name"
                required 
                />
                </td>
            </tr>
            <tr>
              <td className={'label'} >Email:</td>
              <td>
                <input
                type="email"
                name="email"
                value={formObject.email}
                onChange={handleInputChange}
                placeholder="name@company.com" 
                />
                </td>
            </tr>
            <tr>
              <td className={'label'} >Pass:</td>
              <td>
                <input
                type="text"
                name="password"
                value={formObject.password}
                onChange={handleInputChange}
                placeholder="password" 
                />
                </td>
            </tr>
            {/* Action buttons: Delete, Save, Cancel */}
            <tr className="button-bar">
              <td colSpan="2">
                <input 
                type="button" 
                value="Delete" 
                onClick={handleDeleteClick} 
                />
                <input 
                type="button" 
                value="Save" 
                onClick={handleSaveClick} 
                />
                <input 
                type="button" 
                value="Cancel" 
                onClick={handleCancelClick} 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
  );
}
