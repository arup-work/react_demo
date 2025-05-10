import apiRequest from "../helpers/utils/api"
import { showErrorToast, showSuccessToast } from "../helpers/utils/toastUtils";

const AuthService = {
    register: async (firstName, lastName, email, password) => {
        try {
            const response = await apiRequest('auth/register', 'POST', { firstName, lastName, email, password });
            showSuccessToast(response.message)
            return response;
        } catch (error) {
            showErrorToast(error.message);
        }
    },

    login: async(email, password) => {
        try {
            const response = await apiRequest('auth/login', 'POST', { email, password });
            showSuccessToast(response.message)
            return response;
        } catch (error) {
            showErrorToast(error.message);
        }
    }
}

export default AuthService;