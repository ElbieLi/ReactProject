import React from 'react';


const customers = [
  {name: 'Jack Jackson', email: 'jack@abc.com', password: 'jackj'},
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
      <h1>Customer List</h1>
      <table>
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
      <h2>Update</h2>
      <form>
        <label>
          Name:
          <input type="text" value="Jack Jackson" readOnly />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value="jackj@abc.com" readOnly />
        </label>
        <br />
        <label>
          Pass:
          <input type="password" value="jackj" readOnly />
        </label>
        <br />
        <button type="button" onClick={onDeleteClick}>Delete</button>
        <button type="button" onClick={onSaveClick}>Save</button>
        <button type="button" onClick={onCancelClick}>Cancel</button>
      </form>
    </div>
  );
}

export default App;
