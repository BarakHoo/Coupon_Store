import axios from "axios";
import {ClientType} from "../Models/ClientType";
import {authStore} from "../Redux/AuthStore";
import {login, logout} from "../Redux/AuthSlice";

class AuthService {
    public async login(email: string, password: string, clientType: ClientType) {

        console.log(email, password, clientType)
        const response = await axios.post<string>(
            "http://localhost:8080/auth/login",
            null,
            {
                params: {
                    email: email,
                    password: password,
                    clientType: ClientType[clientType],
                },
            }
        );
        authStore.dispatch(login(response.data))
        return response.data;
    }

    public async logout(){
        const response = await axios.post<string>("http://localhost:8080/auth/logout")
        authStore.dispatch(logout());
        return response.data;
    }
}


const authService = new AuthService();
export default authService;