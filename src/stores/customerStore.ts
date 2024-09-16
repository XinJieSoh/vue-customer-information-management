import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    dob: string | Date;
    createdAt: string;
    updatedAt: string;
}

interface newCustomer extends Omit<Customer, '_id'|'createdAt'|'updatedAt'> {}

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useCustomerStore = defineStore('customer', () => {
    const customers = ref<Customer[]>(JSON.parse(localStorage.getItem('customers') || '[]'));
    const customer = ref<Customer>(JSON.parse(localStorage.getItem('customer') || '{}'));
  
    const fetchCustomers = async () => {
        try {
            const response = await axios.get<{ customers: Customer[] }>(`${baseUrl}/customers`);
            customers.value = response.data.customers;
            localStorage.setItem('customers', JSON.stringify(customers.value)); // Persist data in localStorage
        } catch (error) {
            alert(`Error fetching customers: ${error}`);
        }
    };
  
    const clearCustomers = () => {
        customers.value = [];
        localStorage.removeItem('customers'); // Clear persisted data
    };
  
    const createCustomer = async (customer: newCustomer) => {
        try {
            const response = await axios.post<Customer>(`${baseUrl}/customer/create`, customer);
            const customerId = response.data._id;
            if (customerId !== '') {
                alert('Customer created successfully!'); // Show a success message
            }
        } catch (error) {
            alert(`Failed to create customer: ${error}`);
        }
    };
  
    const getCustomerById = async (_id: string) => {
        const response = await axios.get<Customer>(`${baseUrl}/customer/${_id}`);
        customer.value = response.data;
        return customer.value;
    };
  
    const editCustomer = async (_id: string, newCustomer: newCustomer) => {
        try {
            const response = await axios.put<Customer>(`${baseUrl}/customer/${_id}`, newCustomer);
            customer.value = response.data;
            return response;
        } catch (error) {
            alert(`Failed to update customer: ${error}`);
        }
    };
  
    const deleteCustomer = async (_id: string) => {
        try {
            await axios.delete<Customer>(`${baseUrl}/customer/${_id}`);
        } catch (error) {
            alert(`Error deleting customer: ${error}`);
        }
    };
  
    return {
        customers,
        customer,
        fetchCustomers,
        clearCustomers,
        createCustomer,
        getCustomerById,
        editCustomer,
        deleteCustomer,
    };
});