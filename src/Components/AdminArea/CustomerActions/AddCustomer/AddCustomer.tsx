import "./AddCustomer.css";
import Customer from "../../../../Models/Customer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import customerService from "../../../../Services/CustomerService";
import errorHandler from "../../../../Services/ErrorHandler";
import adminService from "../../../../Services/AdminService";

function AddCustomer(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Customer>();
    const navigate = useNavigate();

    function sendForm(customer: Customer) {
        adminService
            .addCustomer(customer)
            .then(() => {
                console.log("Customer added!");
                navigate("/customers");
            })
            .catch((e) => errorHandler.showError(e));
    }

    return (
        <div className="AddCustomer">
            <form onSubmit={handleSubmit(sendForm)}>
                <input
                    type="text"
                    placeholder="Enter first name"
                    id="firstName"
                    {...register("firstName", {
                        required: { message: "Must enter first name!", value: true },
                    })}
                />
                <br />
                {formState.errors?.firstName && (
                    <span>{formState.errors?.firstName?.message}</span>
                )}

                <input
                    type="text"
                    placeholder="Enter last name"
                    id="lastName"
                    {...register("lastName", {
                        required: { message: "Must enter last name!", value: true },
                    })}
                />
                <br />
                {formState.errors?.lastName && (
                    <span>{formState.errors?.lastName?.message}</span>
                )}

                <input
                    type="email"
                    placeholder="Enter customer email"
                    id="email"
                    {...register("email", {
                        required: { message: "Must enter email!", value: true },
                    })}
                />
                <br />
                {formState.errors?.email && (
                    <span>{formState.errors?.email?.message}</span>
                )}

                <input
                    type="password"
                    placeholder="Enter customer password"
                    id="password"
                    {...register("password", {
                        required: { message: "Must enter password!", value: true },
                    })}
                />
                <br />
                {formState.errors?.password && (
                    <span>{formState.errors?.password?.message}</span>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddCustomer;
