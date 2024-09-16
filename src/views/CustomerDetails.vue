<template>
    <section>
        <div class="card m-1 bg-primary-subtle">
            <form class="container-fluid customer_details" @submit.prevent="handleSubmit">
                <h2> Customer Details</h2>
                <div class="mb-3">
                    <label for="name" class="form-label">Full Name</label><span v-if="!isViewMode"
                        class="text-red">*</span>
                    <input v-if="!isViewMode" type="text" class="form-control" placeholder="Full Name"
                        v-model="newCustomer.name">
                    <span v-else class="form-control" readonly>{{ customer.name }}</span>
                </div>
                <div class="mb-3 row">
                    <div class="col">
                        <label for="email" class="form-label">Email</label><span v-if="!isViewMode"
                            class="text-red">*</span>
                        <input v-if="!isViewMode" type="email" class="form-control" placeholder="Email Address"
                            v-model="newCustomer.email">
                        <span v-else class="form-control" readonly>{{ customer.email }}</span>
                    </div>
                    <div class="col">
                        <label for="phone" class="form-label">Phone</label><span v-if="!isViewMode"
                            class="text-red">*</span>
                        <input v-if="!isViewMode" type="text" class="form-control" placeholder="Phone Number"
                            v-model="newCustomer.phone">
                        <span v-else class="form-control" readonly>{{ customer.phone }}</span>
                    </div>
                </div>

                <div class="mb-3 row">
                    <div class="col">
                        <label for="gender" class="form-label">Gender</label>
                        <div v-if="!isViewMode">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="male" value="Male"
                                    v-model="newCustomer.gender" />
                                <label class="form-check-label" for="male">Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="female" value="Female"
                                    v-model="newCustomer.gender" />
                                <label class="form-check-label" for="female">Female</label>
                            </div>
                        </div>
                        <div v-else>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="male" value="Male"
                                    v-model="customer.gender" :disabled="true"/>
                                <label class="form-check-label" for="male">Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" id="female" value="Female"
                                    v-model="customer.gender" :disabled="true"/>
                                <label class="form-check-label" for="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <date-input date="{{date}}" timezone="[[timezone]]"></date-input>
                        <input v-if="!isViewMode" type="date" class="form-control"
                            v-model="newCustomer.dob">
                        <span v-else class="form-control" readonly>{{ moment(customer.dob).format('DD-MM-YYYY') }}</span>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <button v-if="!isViewMode" type="submit" :disabled="isFormInvalid" class="btn btn-primary">{{
                        submitButtonText }}</button>
                </div>
            </form>
        </div>
        <div v-if="isFormInvalid" class="alert alert-danger" role="alert">
            <b>Full name</b>, <b>Email</b> and <b>Phone Number</b> are required.
        </div>
    </section>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customerStore';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';

const customerEntities = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: ''
}

const customerStore = useCustomerStore();
const route = useRoute();
const router = useRouter();
let customer = customerStore.customer;

const newCustomer = ref(customerEntities);
const submitButtonText = ref('');
const isViewMode = ref(false);
const isCreateMode = ref(false);

const nameError = ref('');
const emailError = ref('');
const phoneError = ref('');
const isFormInvalid = computed(() => (!newCustomer.value.name || !newCustomer.value.email || !newCustomer.value.phone) && !isViewMode.value);
let currentId = route.params._id ? route.params._id as string : null;

function watchField(valueRef: any, errorRef: { value: string; }, errorMessage: string) {
    watch(valueRef, (newValue) => {
        if (!newValue) {
            errorRef.value = !newValue ? errorMessage : '';
        }
    }
    );
}

// Set up watchers for each field using the common function
watchField(() => newCustomer.value.name, nameError, 'Full Name is required.');
watchField(() => newCustomer.value.email, emailError, 'Email is required.');
watchField(() => newCustomer.value.phone, phoneError, 'Phone is required.');

onMounted(async () => {
    if (currentId) {
        customer = await customerStore.getCustomerById(currentId);
        if (route.path.includes('edit')) {
            submitButtonText.value = 'Save Changes';
            isViewMode.value = false;
            newCustomer.value = {
                name: newCustomer.value.name ? newCustomer.value.name : customer.name,
                email: newCustomer.value.email ? newCustomer.value.email : customer.email,
                phone: newCustomer.value.phone ? newCustomer.value.phone : customer.phone,
                gender: newCustomer.value.gender ? newCustomer.value.gender : customer.gender,
                dob: newCustomer.value.dob ? moment(newCustomer.value.dob).format('YYYY-MM-DD') : moment(customer.dob).format('YYYY-MM-DD')
            }
        } else {
            isViewMode.value = true;
        }
    } else {
        submitButtonText.value = 'Create Customer';
        isCreateMode.value = true;
        isViewMode.value = false;
    }
});


const createCustomer = async () => {
    await customerStore.createCustomer(newCustomer.value);
    newCustomer.value = customerEntities;
};

const handleSubmit = async () => {
    if (isViewMode.value) return;
    if (route.path.includes('create')) {
        await createCustomer()
        router.push('/customers');
    } else if (route.path.includes('edit') && currentId) {
        customer = await customerStore.getCustomerById(currentId);
        await customerStore.editCustomer(currentId, newCustomer.value);
        alert('Customer updated successfully!');
        router.push(`/customer/${currentId}/edit`);
    }
};

</script>