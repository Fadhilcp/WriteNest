import { API_ROUTES } from "@/constants/apiRoutes";
import api from "@/lib/api";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface VerifyRegisterData {
    email: string;
    otp: string;
}

interface LoginData {
    email: string;
    password: string;
}

class AuthService {
    
    async register(data: RegisterData) {
        return await api.post(API_ROUTES.AUTH.REGISTER, data);
    }
    
    async verifyRegister(data: VerifyRegisterData) {
        return await api.post(API_ROUTES.AUTH.VERIFY_REGISTER, data);
    }

    async login(data: LoginData) {
        return await api.post(API_ROUTES.AUTH.LOGIN, data);
    }

    async refresh() {
        return await api.post(API_ROUTES.AUTH.REFRESH);
    }

    async logout() {
        return await api.post(API_ROUTES.AUTH.LOGOUT);
    }
}

const authService = new AuthService();
export default authService;