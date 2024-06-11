                                                                                                                                                                                                                                                          <script setup>
import {onMounted, ref } from "vue";
import tableComponent from "./components/tableComponent.vue";
import axios from "axios";


const form = ref({
  First_Name: "",
  Last_Name: "",
  DOB: "",
  Mobile_No: "",
  Address: "",
});
const user = ref({
  First_Name: "",
  Last_Name: "",
  DOB: "",
  Mobile_No: "",
  Address: "",
});

const records = ref([]);
const editingIndex=ref(false);
const editableRecord=ref(null);
const del = ref(true);
const fetchRecords = async () => {
  try {
    const response = await axios.get("/api/v1/student/getall");
    records.value = response.data.data;
  } catch (error) {
    console.error('Error fetching records:', error);
  }
};

onMounted(fetchRecords);

const editRecord = (index) => {
 editingIndex.value = true;
 editableRecord.value = index;
  records.value[index].editing = true;
  form.value = records.value[index] ;
  console.log(form.value);
};

const updateRecord= async (index) => {
  try {
    // console.log(enter.value)
    const studentId = records.value[index].ID;
   console.log (studentId);
   
    await axios.put(`/api/v1/student/update/${studentId}`, form.value);
    console.log(form.value);
    await fetchRecords();
    editingIndex.value = false;
    editableRecord.value = null;
    
    resetForm();
    del.value = true;
  } catch (error) {
    console.error('Error updating record:', error);
  }
};

const deleteRecord = async (index) => {
  try {
    const studentId = records.value[index].ID;
  //  const studentId =2;
    console.log(index);
    console.log(studentId);
    await axios.delete(`/api/v1/student/delete/${studentId}`);
    console.log(1);
    // records.value.splice(index, 1);
    await fetchRecords();
    alert("Record deleted successfully");
  } catch (error) {
    console.error('Error deleting record:', error);
  }
};
const handleSubmit = async() => {
  try {
    if (editingIndex.value && editableRecord.value !== null) {
      const studentId = records.value[editableRecord.value].id;
      await axios.put(`/api/v1/student/update/${studentId}`, form.value);
    } else {
      console.log(form.value);
      await axios.post('/api/v1/student/insert', form.value);
      
}
    await fetchRecords();
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  }
};
  // records.value.push({ ...form.value });
  


function resetForm () {
  form.value = {
    First_Name :"",
    Last_Name: "",
    DOB: "",
    Mobile_No: "",
    Address: "",
  };
  editingIndex.value=false;
  editableRecord.value=null;
};
</script>
<template>
  <div class="main-container">
    <form @submit.prevent="handleSubmit">
      <h1>REGISTRATION FORM</h1>
      <div class="container">
        <div>
          <label>
            First Name: <input type="text" v-model= "form.First_Name" required />
          </label>
        </div>
        <div>
          <label>
            Last Name: <input type="text" v-model="form.Last_Name" required />
          </label>
        </div>
        <label>
            <div>
            Date of Birth:
            <input type="date" v-model="form.DOB" required />
          </div>
          </label>
        <label>
            <div>
            Mobile Number:
            <input type="number" v-model="form.Mobile_No" required />
          </div>
          </label>
        <label class="address"> Address: </label>
          <div>
          <textarea cols="40" rows="3" v-model="form.Address" required></textarea>
        </div>
        <div class="registerbtn">
      <button type="submit" class="register">REGISTER</button></div>
      </div>
    </form>
    <tableComponent
      v-if="records.length > 0"
      :records="records"
      @deleteRecord="deleteRecord"
      @editRecord="editRecord"
      @updateRecord="updateRecord"
    />
  </div>
</template>
<style>
h1 {
  display: flex;
  justify-content: center;
  font-weight: bold;
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