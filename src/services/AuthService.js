import apiRequest from "../helpers/utils/api"

const AuthService = {
    register: async(name, email, password) => {
        const response = await apiRequest('auth/register','POST',{ name, email, password});
        console.log(response);
        
    }
}