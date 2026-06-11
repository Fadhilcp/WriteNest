import api from "@/lib/api";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginData {
    email: string;
    password: string;
}

class AuthService {
    async register(data: RegisterData) {
        return await api.post("/auth/register", data);
    }

    async login(data: LoginData) {
        return await api.post("/auth/login", data);
    }

    async refresh() {
        return await api.post("/auth/refresh");
    }

    async logout() {
        return await api.post("/auth/logout");
    }
}

const authService = new AuthService();

export default authService;