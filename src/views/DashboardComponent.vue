<template>
    <div class="welcome">
        <table>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee.employeeId">
                    <td>{{employee.employeeId}}</td>
                    <td>{{employee.employeeName}}</td>
                    <td>{{employee.employeeEmail}}</td>
                    <td>{{employee.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ManagerService from '@/services/ManagerService';
export default {
    name: 'DashboardComponent',
    
    data() {
        return {
            employees: []
        }
    },

    created() {
        this.getEmployee()
    },

    methods: {
        async getEmployee() {
            await ManagerService.getEmployee().then((response) => {
                this.employees = response.data;

            }, (error) => {
                console.error(error)
            })
        }
    },
    
}
</script>
