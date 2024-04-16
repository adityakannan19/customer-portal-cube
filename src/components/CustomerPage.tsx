import './CustomerPage.css'; 

import React, { useState, useCallback } from 'react';
import { Customer } from '../types';
import CustomerListComponent from './CustomerListComponent';
import CustomerDetailsComponent from './CustomerDetailsComponent';
import PhotoGridComponent from './PhotoGridComponent';

interface CustomerPageProps {
  customers: Customer[];
  photos: { [key: string]: string[] };
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customers, photos }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleSelectCustomer = useCallback((customer: Customer) => {
    console.log("Selected customer:", customer);
    setSelectedCustomer(prevCustomer => prevCustomer !== customer ? customer : null);
  }, []);

  console.log("Rendering CustomerPage with selected customer:", selectedCustomer);

  return (
    <div className="customer-page">
      <div className="page-heading">Customer Management</div>
      <div className="customer-container">
        <div className="customer-nav">
          <CustomerListComponent customers={customers} selectedCustomer={selectedCustomer} onSelect={handleSelectCustomer} />
        </div>
        <div className="customer-details-and-photos">
          <div className="customer-details">
            <CustomerDetailsComponent customer={selectedCustomer} />
          </div>
          <div className="photo-grid">
            {selectedCustomer && <PhotoGridComponent photos={photos[selectedCustomer.id] || []} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
