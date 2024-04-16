import React from 'react';
import { Customer } from '../types';

interface CustomerListComponentProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
}

const CustomerListComponent: React.FC<CustomerListComponentProps> = ({ customers, selectedCustomer, onSelect }) => {
  return (
    <nav className="customer-nav">
      <ul>
        {customers.map((customer) => (
          <li onClick={() => onSelect(customer)} className={selectedCustomer && selectedCustomer.id === customer.id ? 'selected' : ''}>
            <div>
              <h3>{customer.name}</h3>
              <p>{customer.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomerListComponent;
