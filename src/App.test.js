import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import * as memdb from './memdb';

// Mock the functions from memdb.js
jest.mock('./memdb', () => ({
  getAll: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  deleteById: jest.fn(),

}));

describe('App Component', () => {
  // Setup mock data for the customers
  const mockCustomers = [
    {id: 1, name: 'Elbie Li', email: 'elbie@abc.com', password: 'password123'},
    {id: 2, name: 'Mochi Sun', email: 'mochi@abc.com', password: 'pass123'},
  ];

  beforeEach(() => {
    // Reset mocks before each test
    memdb.getAll.mockClear();
    memdb.post.mockClear();
    memdb.put.mockClear();
    memdb.deleteById.mockClear();

    // Provide mock data for the getAll function
    memdb.getAll.mockReturnValue(mockCustomers);
  });

  test('renders customer list and form', () => {
    render(<App />);

    // Check that the customer list is rendered
    expect(screen.getByText('Customer List')).toBeInTheDocument();

    // Check that the customer names are displayed
    expect(screen.getByText('Elbie Li')).toBeInTheDocument();
    expect(screen.getByText('Mochi Sun')).toBeInTheDocument();

    // Check that the form for adding/updating customers is displayed
    expect(screen.getByPlaceholderText('Customer Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@company.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
  });

  test('selecting a customer fills the form', () => {
    render(<App />);

    // Click on Elbie Li in the customer list
    fireEvent.click(screen.getByText('Elbie Li'));

    // Check that the form is filled with Elbie Li's data
    expect(screen.getByDisplayValue('Elbie Li')).toBeInTheDocument();
    expect(screen.getByDisplayValue('elbie@abc.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password123')).toBeInTheDocument();
  });

  test('adding a new customer works', () => {
    render(<App />);

    // Fill in the form with new customer data
    fireEvent.change(screen.getByPlaceholderText('Customer Name'), {
      target: { value: 'Wilson Sun'},
    });
    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: { value: 'wilson@abc.com'},
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: '123456'},
    });

    // Click the Save button
    fireEvent.click(screen.getByText('Save'));

    // Check that the post function is called with the new customer data
    expect(memdb.post).toHaveBeenCalledWith({
      id: -1,
      name: 'Wilson Sun',
      email: 'wilson@abc.com',
      password: '123456',
    });
  });

  test('updating an existing customer works', () => {
    render(<App />);

    // Select Elbie Li in the customer list
    fireEvent.click(screen.getByText('Elbie Li'));

    // update the email field
    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: {value: 'updatedElbie@abc.com'},
    });

    // Click the Save button
    fireEvent.click(screen.getByText('Save'));

    // Check that the put function is called with the updated data
    expect(memdb.put).toHaveBeenCalledWith(1, {
      id: 1,
      name: 'Elbie Li',
      email: 'updatedElbie@abc.com',
      password: 'password123',
    });
  });

  test('deleting a customer works', () => {
    render(<App />);

    // Select Elbie Li in the customer list
    fireEvent.click(screen.getByText('Elbie Li'));

    // Click the Delete button
    fireEvent.click(screen.getByText('Delete'));

    // Check that the deleteById function is called with Elbie's ID
    expect(memdb.deleteById).toHaveBeenCalledWith(1);
  });

  test('cancelling clears the form', () => {
    render(<App />);

    // Select Elbie Li in the customer list
    fireEvent.click(screen.getByText('Elbie Li'));

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check that the form is reset to the blank state
    expect(screen.getByPlaceholderText('Customer Name').value).toBe('');
    expect(screen.getByPlaceholderText('name@company.com').value).toBe('');
    expect(screen.getByPlaceholderText('password').value).toBe('');
  });
});

