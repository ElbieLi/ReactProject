import React from 'react';

function CustomerList({customers, selectedCustomerId, onSelectCustomer}){
    return(
        <div className="boxed" >
            <h4>Customer List</h4>
            <table id="customer-list">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr 
                    key={customer.id} 
                    className={ customer.id === selectedCustomerId ? 'selected': ''}
                    onClick={()=>onSelectCustomer(customer)} 
                    >
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                    </tr>
                    ))}
            </tbody>
            </table>
        </div>
    );
}

export default CustomerList;