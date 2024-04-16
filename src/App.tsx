import React, { useState, useEffect } from 'react';
import CustomerPage from './components/CustomerPage';
import { fetchCustomers, fetchPhotos } from './services/ApiService'; // Assuming fetchPhotos function exists
import { Customer } from './types';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [photos, setPhotos] = useState<{ [key: string]: string[] }>({}); // Object to store photos for each customer

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomers = await fetchCustomers();
      setCustomers(fetchedCustomers);
      // Fetch photos for each customer and store them in the photos object
      for (const customer of fetchedCustomers) {
        const fetchedCustomerPhotos = await fetchPhotos();
        setPhotos((prevPhotos) => ({ ...prevPhotos, [customer.id]: fetchedCustomerPhotos }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <CustomerPage customers={customers} photos={photos} />
    </div>
  );
};

export default App;
