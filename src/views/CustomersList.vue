<template>
    <div>
      <section class="card">
        <div class="card-header">
          <h4>
            Customers
            <RouterLink to="/customer/create" class="btn btn-primary float-end">
              Add Customer
            </RouterLink>
          </h4>
        </div>
  
        <div class="card-body">
          <!-- Filter/Search Function -->
          <div class="input-group mb-3">
            <select v-model="searchField" id="searchField">
              <option value="" disabled>Search by</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <input v-model="searchQuery" type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Enter keywords and select category to search...">
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr class="table-primary">
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="paginatedCustomers.length!==0">
              <tr v-for="customer in paginatedCustomers" :key="customer._id">
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ moment(customer.createdAt).format('YYYY-MM-DD h:mm') }}</td>
                <td>{{ moment(customer.updatedAt).format('YYYY-MM-DD h:mm') }}</td>
                <td class="button-set">
                  <button class="btn btn-primary" @click="viewCustomer(customer._id)">View</button>
                  <button class="btn btn-primary" @click="editCustomer(customer._id)">Edit</button>
                  <button class="btn btn-danger" @click="deleteCustomer(customer._id)">Delete</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="5">No customer is available.</td>
                </tr>
            </tbody>
          </table>
          <!-- Pagination Function -->
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
        
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCustomerStore } from '@/stores/customerStore';
  import { computed, onMounted, ref } from 'vue';
  import moment from 'moment';
  import { useRouter } from 'vue-router';
  
  const customerStore = useCustomerStore();
  const customers = computed(() => customerStore.customers);
  const router = useRouter();
  // Local state for filtering
  const searchQuery = ref<string>('');
  const searchField = ref<string>('name');
  const currentPage = ref<number>(1);  // Current page number
  const itemsPerPage = ref<number>(5); // Number of items per page
  
  
  // Computed property for filtered customers
  const filteredCustomers = computed(() => {
    return customers.value.filter((customer) => {
      const fieldValue = customer[searchField.value as keyof typeof customer]?.toString().toLowerCase();
      return fieldValue?.includes(searchQuery.value.toLowerCase());
    });
  });
  
  // Computed property for paginated customers
  const paginatedCustomers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredCustomers.value.slice(start, end);
  });
  
  // Total number of pages
  const totalPages = computed(() => {
    return Math.ceil(filteredCustomers.value.length / itemsPerPage.value);
  });
  
  // Navigation methods
  (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
    }
  };
  
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };
  
  onMounted(async() => {
    customerStore.clearCustomers();
    if (customerStore.customers.length === 0) {
      await customerStore.fetchCustomers(); // Fetch data if not already present
    }
  });
  
  const viewCustomer = (_id: string) => {
    router.push(`/customer/${_id}/view`);
  };
  
  const editCustomer = (_id: string) => {
    router.push(`/customer/${_id}/edit`);
  };
  
  const deleteCustomer = async (_id: string) => {
    await customerStore.deleteCustomer(_id);
    alert('Customer deleted successfully!');
    await customerStore.fetchCustomers();
  }
  </script>