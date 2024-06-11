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
          <button v-if="editingIndex !== index" class="editbtn" @click="editRecord(index)">Edit</button>
          <button v-else class="updatebtn" @click="updateRecord(index)">Update</button>
          <button class="deletebtn" @click="deleteRecord(index)">Delete</button>

        </td></tr>
  </tbody>
  </table>
  </div>

</template>

<script setup lang="ts">
import { defineProps,defineEmits, ref} from 'vue';

const editingIndex = ref();
const editableRecord = ref({});
const emit = defineEmits(['deleteRecord', 'updateRecord','editRecord']);


const editRecord = (index:number) => {
   
  editingIndex.value = index;
  editableRecord.value={...props.records[index]};
  emit('editRecord', index, editingIndex.value);
};

 interface Record {
First_Name: string;
Last_Name: string;
DOB: string;
Mobile_No: string;
Address: string;
editing: boolean;
};

const props = defineProps<{
  records:Record[];
}>();
const deleteRecord = (index) => {
  emit('deleteRecord',index);
props.records.splice(index, 1);
alert("Do you what to delete the record data?");
};
const updateRecord = (index) => {
  emit('updateRecord', index, editingIndex.value);
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
        height: 50px;
        width :100px;
      }
tr:nth-child(even) {
 background-color: #fafbfd;
      }
</style>