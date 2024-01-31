import "./Login.css";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import authService from "../../../Services/AuthService";
import errorHandler from "../../../Services/ErrorHandler";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {authStore} from "../../../Redux/AuthStore";

function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();

    const doLogin = (data: any) => {
        const { email, password, clientType } = data;

        authService.login(email, password, clientType)
            .then(() => {
                const user = authStore.getState().user;
                console.log("User object:", user); // Log user object for debugging
                const welcomeMessage =
                    clientType === "2" ? `Welcome ${user.firstName}` : `Welcome ${user.name}`;

                toast.success(welcomeMessage);
                navigate("");
            })
            .catch((err) => {
                errorHandler.showError(err);
            });
    };

    return (
        <div className="Login">
            {authStore.getState().token.length === 0 ? (
                <FormControl>
                    <FormLabel>Welcome to John Coupon! Please log in.</FormLabel>
                    <br/>
                    <TextField variant="filled" label="Email" id="email" {...register("email")} required />
                    <TextField variant="filled" label="Password" id="password" type="password" {...register("password")} required />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Company"
                        id="clientType"
                        {...register("clientType")}
                    >
                        <FormControlLabel value="0" control={<Radio {...register("clientType")} />} label="Administrator" />
                        <FormControlLabel value="1" control={<Radio {...register("clientType")} />} label="Company" />
                        <FormControlLabel value="2" control={<Radio {...register("clientType")} />} label="Customer" />
                    </RadioGroup>
                    <br/>
                    <Button variant="contained" onClick={handleSubmit(doLogin)}>Log In</Button>
                </FormControl>
            ) : (
                <div>
                    Welcome {authStore.getState().user.role === "CUSTOMER" ? authStore.getState().user.firstName : authStore.getState().user.name}
                </div>
            )}
        </div>
    );
}

export default Login;
