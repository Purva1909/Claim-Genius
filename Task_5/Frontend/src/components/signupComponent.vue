<template>
    <div class="signup-container">
        <form @submit.prevent="handlesignup">
            <h1>SIGNUP</h1>
            <div>
                <lable for = "name">Name:</lable>
                <input type="text" v-model="name" required>
            </div>
            <div>
          <label for="username">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div >
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">signup</button>
      </form>
      <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const router = useRouter();

  const handlesignup = async () => {
    try {
      const response = await axios.post('/api/student/signup', { name: name.value,email:email.value, password: password.value });
      if (response.data.success) {
        router.push('/login');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
</script>