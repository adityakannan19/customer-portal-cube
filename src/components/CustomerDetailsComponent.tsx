import React from 'react';
import { Customer } from '../types';
import PhotoGridComponent from './PhotoGridComponent';

interface CustomerDetailsComponentProps {
  customer: Customer | null;
}

const CustomerDetailsComponent: React.FC<CustomerDetailsComponentProps> = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <div>
        <p>Name: {customer.name}</p>
        <p>Title: {customer.title}</p>
        <p>Address: {customer.address}</p>
      </div>
      <PhotoGridComponent photos={customer.photos} />
    </div>
  );
};

export default CustomerDetailsComponent;
