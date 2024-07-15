<template>
    <div>
  
  <table>
    <thead class="table-header">
        <tr>
        <th>First Name 
          <button class="asc" @click="sortStudent('asc', 'First_Name')"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i></button>
          <button class="desc" @click="sortStudent('desc', 'First_Name')"><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></button>
        </th>
        <th>Last Name
          <button class="asc" @click="sortStudent('asc', 'Last_Name')"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i></button>
          <button class="desc" @click="sortStudent('desc', 'Last_Name')"><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></button>
        </th>
        <th>Date of Birth
          <button class="asc" @click="sortStudent('asc', 'DOB')"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i></button>
          <button class="desc" @click="sortStudent('desc', 'DOB')"><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></button>
        </th>
        <th>Mobile Number
          <button class="asc" @click="sortStudent('asc', 'Mobile_No')"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i></button>
          <button class="desc" @click="sortStudent('desc', 'Mobile_No')"><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></button>
        </th>
        <th>Address
          <button class="asc" @click="sortStudent('asc', 'Address')"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i></button>
          <button class="desc" @click="sortStudent('desc', 'Address')"><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></button>
        </th>
        <th class="action">Actions</th>
        </tr>
    </thead>
    <tbody v-if = "records.length">
        <tr v-for="(record, index) in records" :key="index">
          <td><input v-if="editingIndex === index" v-model="record.First_Name" required />
              <span v-else>{{ record.First_Name }}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.Last_Name" required/>
              <span v-else>{{ record.Last_Name}}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.DOB" required/>
              <span v-else>{{ record.DOB}}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.Mobile_No" required />
              <span v-else>{{ record.Mobile_No }}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.Address" required />
              <span v-else>{{ record.Address }}</span></td>
          <td> 
            <button v-if="editingIndex !== index" class="editbtn" @click="editRecord(index)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button>
            <button v-else class="updatebtn" @click="updateRecord(index)"><i class="fa fa-pencil" aria-hidden="true"></i>Update</button>
            <button class="deletebtn" @click="deleteRecord(index)"><i class="fa fa-trash" aria-hidden="true"></i>Delete</button>
  
          </td></tr>
    </tbody>
    <tbody v-else>
          <tr>
            <td colspan="6">
              <p>No students found</p>
            </td>
          </tr>
        </tbody>
    </table>
    </div>
  
  </template>
  
  <script setup lang="ts">
  import {defineProps, defineEmits, ref} from 'vue';
  import type { Student,Record } from '../type/type';
  
  const editingIndex= ref();
  const editableRecord = ref({});
  const emit = defineEmits(['deleteRecord', 'updateRecord','editRecord', 'sortStudent']);
  const sm = ref();
  const cn = ref();
  
  const editRecord = (index:number) => {
     
    editingIndex.value = index;
    editableRecord.value={...props.records[index]};
    emit('editRecord', index, editingIndex.value);
  };
  
  // interface Record {
  // ID : number,
  // First_Name: string;
  // Last_Name: string;
  // DOB: string;
  // Mobile_No: string;
  // Address: string;
  // editing?: boolean;
  // };
  
  const props = defineProps<{
    records:Record[];
    perPage:number;
    page:number;
  
  }>();
  const deleteRecord = (index:number) => {
    emit('deleteRecord',index);
  props.records.splice(index, 1);
  alert("Do you what to delete the record data?");
  };
  const updateRecord = (index:number) => {
    emit('updateRecord', index, editingIndex.value);
    editableRecord.value = {};
    editingIndex.value = {};
  };
  const sortStudent = async(sortMetho:string, colNam:string)=>{
    try {
      sm.value = sortMetho;
      cn.value = colNam;
      console.log(sortMetho);
  
    emit('sortStudent',sm,cn);
   } catch (error) {
      console.error('Error searching students:', error);
    }
  }
  </script>
  <style scoped>
  table, th, td {
  border:1px solid black;
  border-collapse: collapse;
  font-weight: bold;
  }
  .editbtn ,.updatebtn{
    border-radius: 7px;
    padding: 3px;
    margin: 3px;
    background-color: #008cba;
    font-weight: bold;
    border-color: black;
    border: 3px;
    color: #FFFFFF;
  }
  
  .deletebtn{
    border-radius: 7px;
    padding: 3px;
    margin: 3px;
    font-weight: bold;
    background-color: #008cba;
    border: 3px;
    color: #FFFFFF;
   
  }
  .table-header{
          background-color:#f3f3f3;
          font-size: 14px;
          height: 50px;
          width :100px;
        }
  tr:nth-child(even) {
   background-color: #fafbfd;
        }
  .asc , .desc{
    border-radius: 3px;
    /* background-color: #70c6e3; */
    margin-right: 4px;
  }
  .action{
    width: 120px;
  }
  </style>