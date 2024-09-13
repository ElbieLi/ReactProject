import React from 'react';

function CustomerAddUpdateForm({
    mode,
    formObject,
    handleInputChange,
    onSaveClick,
    onDeleteClick,
    onCancelClick,
}){
    return(
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
              <td className={'label'} >Password:</td>
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
                onClick={onDeleteClick} 
                />
                <input 
                type="button" 
                value="Save" 
                onClick={onSaveClick} 
                />
                <input 
                type="button" 
                value="Cancel" 
                onClick={onCancelClick} 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    )
}

export default CustomerAddUpdateForm;