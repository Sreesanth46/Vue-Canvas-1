import axios from "axios";

const baseURL = "http://10.5.28.209:8080"
const accessToken = 'Manager '.concat(localStorage.getItem('accessToken'))

class ManagerService {

    login(form) {
        return axios.post(baseURL+"/login",form)
    }

    getEmployee() {
        return axios.get(baseURL+"/employee", { headers: {Authorization: accessToken} })
    }

    getProjects() {
        return axios.get(baseURL+"/projects", { headers: {Authorization: accessToken} })
    }
}

export default new ManagerService()