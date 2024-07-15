<template>
    <div class="login-container">
        <h1>LOGIN</h1>
            <form @submit.prevent="handleLogin">
            <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div >
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">LOGIN</button>
          </form>
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
const email = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('');

const handleLogin= async () => {
  try{
    const response = await axios.post('/api/student/login',{email: email.value,password: password.value,});
    if(response.data.success){
      const token = response.data.token;
      localStorage.setItem('token',token);
      console.log(response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.push('/');
    }
    else{
      errorMessage.value = 'failed to login:  '+ (response.data.message || 'unknown error');
  }
}catch (error) {
  console.error('Error during login:', error);
  if (error.response) {
         errorMessage.value = 'failed to login: ' + (error.response.data.message || 'unknown error');
  } else{
    errorMessage.value = 'failed to login "Network error"';
  }
}
};
</script>