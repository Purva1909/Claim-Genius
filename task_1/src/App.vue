<script setup>
import { ref } from "vue";
import tableComponent from "./components/tableComponent.vue";

const form = ref({
  firstName: "",
  lastName: "",
  dateofBirth: "",
  mobileNumber: "",
  address: "",
});
const records = ref([]);

const handleSubmit = () => {
  records.value.push({ ...form.value });
  resetForm();
};
const resetForm = () => {
  form.value = {
    firstName: "",
    lastName: "",
    dateofBirth: "",
    mobileNumber: "",
    address: "",
  };
};
</script>
<template>
  <div class="main-container">
    <form @submit.prevent="handleSubmit">
      <h1 class="title">REGISTRATION FORM</h1>
      <div class="container">
        <div>
          <label>
            First Name: <input type="text" v-model="form.firstName" required />
          </label>
        </div>
        <div>
          <label>
            Last Name: <input type="text" v-model="form.lastName" required />
          </label>
        </div>
        <label>
            <div>
            Date of Birth:
            <input type="date" v-model="form.dateofBirth" required />
          </div>
          </label>
        <label>
            <div>
            Mobile Number:
            <input type="number" v-model="form.mobileNumber" required />
          </div>
          </label>
        <label class="address"> Address: </label>
          <div>
          <textarea cols="40" rows="3" v-model="form.address" required></textarea>
        </div>
        <div class="registerbtn">
      <button type="submit" class="register">REGISTER</button></div>
      </div>
    </form>
    <tableComponent
      v-if="records.length > 0"
      :records="records"
      @deleteRecord="deleteRecord"
    />
  </div>
</template>
<style>
.title {
  display: flex;
  justify-content: center;
}
.main-container {
  font-size: larger;
}
.container {
  border: 1px solid black;
  padding: 10px;
  border-radius: 4px;
  background-color:#bdb76b;
}
.add {
  display: flex;
  flex-direction: column;
}
input {
  border-radius: 3px;
  margin: 5px;
 
}
.registerbtn {
  display: flex;
  justify-content: center;
}
.register {
  background-color: #008cba;
  border-radius: 5px;
  cursor: pointer;
  width: 30%;
  padding: 6px;
  margin-top: 10px;
}
</style>