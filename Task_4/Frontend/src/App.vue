<script setup lang="ts">
import {onMounted, ref } from "vue";
import tableComponent from "./components/tableComponent.vue";
import axios from "axios";
import type { Student,Record } from './type/type';
  
  const form = ref<Student>({
  First_Name: "",
  Last_Name: "",
  DOB: "",
  Mobile_No: "",
  Address: "",
  ID: 0,
});

const records = ref<Student[]>([]);
const editingIndex=ref<boolean>(false);
const editableRecord=ref<number | null>(null);
const del = ref<boolean>(true);
const searchQuery = ref<string>('');
const totalStudents = ref<number>(0);
const perPage = ref<number>(5);
const page = ref<number>(1);
const sortMethod = ref<string>('desc');
const colName = ref<string>('ID')

const editRecord = (index:number) => {
 editingIndex.value = true;
 editableRecord.value = index;
  records.value[index].editing = true;
  form.value = records.value[index] ;
  console.log(form.value);
};

const updateRecord= async (index:number) => {
  try {
   const studentId = records.value[index].ID;
   console.log (studentId);
    await axios.put(`/api/student/update/${studentId}`, form.value);
    console.log(form.value);
    await fetchRecords();
    editingIndex.value = false;
    editableRecord.value = null;
    resetForm();
    del.value = true;
  } catch (error) {
    console.error('Error in updating student:', error);
  console.error('error i')}
};

const deleteRecord = async (index:number) => {
  try {
    const studentId = records.value[index].ID;
    console.log(index);
    console.log(studentId);
    await axios.delete(`/api/student/delete/${studentId}`);
    console.log(1);
    await fetchRecords();
    alert("Student deleted successfully");
  } catch (error) {
    console.error('Error in deleting student:', error);
  }
};

const searchStudent = async() =>{
  await fetchRecords ()
  if(searchQuery)
  if(page.value > totalPages()){
    page.value = 1;
  }
  try{
  if(searchQuery.value && totalPages()==0){
   page.value=0
   await fetchRecords ();
 }
    else if(page.value > totalPages()){
     page.value = 1;
     await fetchRecords ()
   }
   else if (page.value == 0 && totalPages() != 0) {
     page.value=1;
     await fetchRecords ()
   }
 }
 catch (error) {
     console.error('Error:', error);
   }
    }
const handleSubmit = async() => {
  try {
    if (editingIndex.value && editableRecord.value !== null) {
      const studentId = records.value[editableRecord.value].ID;
      await axios.put(`/api/student/update/${studentId}`, form.value);
    } else {
      console.log(form.value);
      await axios.post('/api/student/insert', form.value);
      
}
    await fetchRecords();
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  }
};

const fetchRecords = async () => {
  try {
    console.log(sortMethod.value, colName.value);
    const response = await axios.get(`/api/student/pagination?pageNo=${page.value}&dataNo=${perPage.value}&fetchStudent=${searchQuery.value}&colName=${colName.value}&sortMethod=${sortMethod.value}`);
    totalStudents.value = response.data.fetchtotal
   
    records.value = response.data.data; 
    
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};
onMounted(async () => {
  await fetchRecords();
});

  const resetForm = () => {
  form.value = {
    First_Name :"",   
    Last_Name: "",
    DOB: "",
    Mobile_No: "",
    Address: "",
    ID: 0,
  };
  editingIndex.value=false;
  editableRecord.value=null;
};
const updateRecords = async(sm:{value:string},cn:{value:string}) => {
  console.log(sm.value,cn.value);
  sortMethod.value = sm.value
  colName.value = cn.value
  console.log(sortMethod.value,colName.value);
  await fetchRecords();
};
const movePage = async(pageNum:number) => {
    page.value = pageNum;
    console.log(page.value,"page")
    await fetchRecords();
}
const totalPages = () : number => {
  const totalPage = Math.ceil(totalStudents.value/perPage.value);
  return totalPage;
}
const changePerPage = async() => {
    page.value = 1;
    await fetchRecords();
}
</script>
<template>
  <div class="main-container">
    <form @submit.prevent="handleSubmit">
      <h1>REGISTRATION FORM</h1>
      <div class= "form">
      <div class="container">
        <div class="field">
          <label>
            First Name: <input type="text" class="fname" v-model= "form.First_Name" placeholder="Enter First Name" required />
          </label>
        </div>
        <div class="field">
          <label>
            Last Name: <input type="text" class="lname" v-model="form.Last_Name" placeholder="Enter Last Name" required />
          </label>
        </div>
        <label>
            <div class="field">
            Date of Birth:
            <input type="date" v-model="form.DOB" required />
          </div>
          </label>
        <label>
            <div class="field">
            Mobile Number:
            <input type="number" v-model="form.Mobile_No" required />
          </div>
          </label>
        <label class="address"> Address: </label>
          <div class="field">
          <textarea cols="40" rows="3" v-model="form.Address" required></textarea>
        </div>
        <div class="register">
      <button type="submit" class="registerbtn">REGISTER</button></div>
      </div>
      </div>
    </form>
    </div>
         <h3>Submitted Records</h3>
    <div class="seen">
      <div class="search">
        <label>Search: </label> 
        <i class="fa fa-search" aria-hidden="true"></i>
        <input v-on:input="searchStudent" placeholder="Search" v-model="searchQuery"/> 
      </div>
      <div class="entries" >
        <label >Total Entries : </label>
            <select v-model="perPage" v-on:change="changePerPage()">
              <option  v-for = "p in 5 ":value="p">{{p}}</option>
            </select>
          </div>
</div>
    <tableComponent
      v-if="records.length > 0"
      :records="records"
      :perPage="perPage"
      :page="page" 
      @deleteRecord="deleteRecord"
      @editRecord="editRecord"
      @updateRecord="updateRecord"
      @sortStudent="updateRecords"
      
    />
  <div class="pagebtn">
    <button @click="movePage(1)":disabled="page===1 || page===0"><i class="fa fa-backward" aria-hidden="true"></i></button>
    <button @click="movePage(page - 1)" :disabled="page === 1 || page === 0"><i class="fa fa-caret-left" aria-hidden="true"></i></button>
          <span>{{ page }} of {{ totalPages() }}</span>
          <button @click="movePage(page + 1)" :disabled="page === totalPages()"><i class="fa fa-caret-right" aria-hidden="true"></i></button>
          <button @click="movePage(totalPages())" :disabled="page === totalPages()"><i class="fa fa-forward" aria-hidden="true"></i></button>
  </div>
</template>
<style>
.form {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.container:focus-within{
  background-color: #f0d1c1;
}
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
  background-color:#ffffff;
}
.add {
  display: flex;
  flex-direction: column;
}
input {
  border-radius: 3px; 
  margin: 5px; 
 }

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.registerbtn {
  background-color: #008cba;
  color: #ffffff;
  font-weight: bold;
  padding:10px 20px ;
  cursor: pointer;
  position: relative;
  border-radius: 12px;
  margin-top: 10px;
}
 
h3{
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-top: 10px;
}
.pagebtn{ 
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.seen{
  display: flex;
  } 
  .entries{
    display: flex;
    text-align: right;
  }

</style>