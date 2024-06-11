<template>
    <div>
  <h3 class="record">Submitted Records</h3>
  <table>
    <thead class="table-header">
        <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Date of Birth</th>
        <th>Mobile Number</th>
        <th>Address</th>
        <th>Actions</th>
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td><input v-if="editingIndex === index" v-model="record.firstName" />
              <span v-else>{{ record.firstName }}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.lastName" />
              <span v-else>{{ record.lastName }}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.dateofBirth" />
              <span v-else>{{ record.dateofBirth}}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.mobileNumber" />
              <span v-else>{{ record.mobileNumber }}</span></td>
          <td><input v-if="editingIndex === index" v-model="record.address" />
              <span v-else>{{ record.address }}</span></td>
          <td> 
            <button v-if="editingIndex !== index" class="editbtn" @click="editRow(index)">Edit</button>
            <button v-else class="updatebtn" @click="saveUpdate(index)">Update</button>
            <button class="deletebtn" @click="deleteRecord">Delete</button>
  
          </td></tr>
    </tbody>
    </table>
    </div>
  
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref} from 'vue';
  
  const editingIndex = ref();
  const editableRecord = ref({});
  const emit = defineEmits(['delete', 'update']);
  
  
  const editRow = (index) => {
    editingIndex.value = index;
    editableRecord.value={...props.records[index]};
  };
  const props = defineProps<{
  records: {
  firstName: string;
  lastName: string;
  dateofBirth: string;
  mobileNumber: string;
  address: string;
  }[];
  }>();
  const deleteRecord = (index) => {
  props.records.splice(index, 1);
  alert("Do you what to delete the record data?");
  };
  const saveUpdate = (index) => {
    emit('update', index, editingIndex.value);
    editableRecord.value = {};
    editingIndex.value = {};
  };
  </script>
  <style scoped>
  table, th, td {
  border:1px solid black;
  border-collapse: collapse;
  font-weight: bold;
  }
  .editbtn ,.deletebtn ,.updatebtn{
    border-radius: 7px;
    padding: 3px;
    margin: 3px;
    background-color: darkgray;
    font-weight: bold;
  }
  .record{
    display: flex;
    justify-content: center;
  }
  .table-header{
          background-color:#f3f3f3;
          font-size: 14px;
        }
  tr:nth-child(even) {
   background-color: #fafbfd;
        }
  </style>