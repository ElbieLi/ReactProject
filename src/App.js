import React from 'react';
import './App.css';


const customers = [
  {name: 'Jack Jackson', email: 'jackj@abc.com', password: 'jackj'},
  {name: 'Katie Kates', email: 'katiek@abc.com', password: 'katiek'},
  {name: 'Glen Glenns', email: 'gleng@abc.com', password: 'gleng'}
]

function App() {

  const onDeleteClick = () => {
    console.log('in onDeleteClick()');
  }

  const onSaveClick = () => {
    console.log('in onSaveClick()');
  }

  const onCancelClick = () => {
    console.log('in onCancelClick()');
  }

  const handleListClick = () => {
    console.log('in handleListClick()');
  }

  return (
    <div>
      <div className="boxed">
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
            {customers.map((customer, index) => (
              <tr key={index} onClick={handleListClick}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerForm
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
      />
    </div>
    );
}

function CustomerForm({onDeleteClick, onSaveClick, onCancelClick}){
  return(
    <div>
      <div className="boxed">
        <h4>Update</h4>
        <form>
          <table id="customer-add-update">
            <tbody>
              <tr>
                <td className={'label'}>Name:</td>
                <td>
                  <input type="text" name="name" placeholder="Customer Name"/>
                </td>
              </tr>
              <tr>
                <td className={'label'}>Email:</td>
                <td>
                  <input type="email" name="email" placeholder="name@company.com"/>
                </td>
              </tr>
              <tr>
                <td className={'label'}>Pass:</td>
                <td>
                  <input type="text" name="password" placeholder="password"/>
                </td>
              </tr>
            </tbody>
            <tr className="button-bar">
              <td colSpan="2">
                <button type="button" onClick={onDeleteClick}>Delete</button>
                <button type="button" onClick={onSaveClick}>Save</button>
                <button type="button" onClick={onCancelClick}>Cancel</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
