<template>
    <div class="container">
        <h1>Login</h1>
        <form v-on:submit.prevent="submitForm">
            <label for="name">Username/Email </label>
            <input type="text" id="name" v-model="email">
            <br>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password">
            <button type="submit">Login</button>
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

