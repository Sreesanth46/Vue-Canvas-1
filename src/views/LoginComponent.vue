<template>

    <div class="login-container">
    <h1>Login</h1>
    <form v-on:submit.prevent="submitForm">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" v-model="email"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" v-model="password"><br><br>
      <input type="submit" value="Submit">
    </form> 
  </div>
  
</template>

<script>
import ManagerService from '../services/ManagerService'
    export default {
        name: 'LoginComponent',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            submitForm() {
                const form = { email: this.email, password: this.password }

                ManagerService.login(form).then((response) => {
                    localStorage.setItem('accessToken', response.data.accessToken.value)
                    localStorage.setItem('refreshToken', response.data.refreshToken.value)
                }, (err) => console.error("Error login " + err))
            },

        },
        created() {

        }
    }
</script>


<style>
    .login-container {
  width: 300px;
  margin: auto;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input[type="text"], input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="submit"] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

</style>
