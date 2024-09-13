import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
import CustomerList from './CustomerList.js';
import CustomerAddUpdateForm from './CustomerAddUpdateForm.js';
import './App.css';

// Main Application Component
function App() {
  
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
  const handleSelectCustomer = (customer) => {
    setFormObject(customer.id === formObject.id ? blankCustomer : customer);
  };  
 
  // Function to handle changes in the form input fields
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormObject((prev) => ({...prev, [name]: value }));
  };

  // Function to handle the cancel button click
  const handleCancel = () => {
    setFormObject(blankCustomer);
  };

  // Function to handle the delete button click
  const handleDelete = () => {
    if(formObject.id >= 0){
      deleteById(formObject.id);
      setFormObject(blankCustomer);
      fetchCustomers();
    }
  };   

  // Function to handle the save button click
  const handleSave = () => {
    if (mode === 'Add') {
      post(formObject);
    }else{
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
    fetchCustomers();
  }

  return (
    <div className="app">
      <CustomerList
      customers={customers}
      selectedCustomerId={formObject.id}
      onSelectCustomer={handleSelectCustomer}
      />
      <CustomerAddUpdateForm
      formObject={formObject}
      mode={mode}
      onInputChange={handleInputChange}
      onSave={handleSave}
      onDelete={handleDelete}
      onCancel={handleCancel}
      />
    </div>
  );
}

export default App;
