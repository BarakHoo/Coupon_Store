import "./UpdateCustomer.css";
import Customer from "../../../../Models/Customer";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService";
import {useEffect, useState} from "react";
import errorHandler from "../../../../Services/ErrorHandler";

function UpdateCustomer(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const {register, handleSubmit, formState, setValue} = useForm<Customer>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        adminService.getOneCustomer(id).then((c) => {
            setCustomer(c);
            if (c) {
                setValue("firstName", c.firstName);
                setValue("lastName", c.lastName);
                setValue("email", c.email);
                setValue("password", c.password);
            } else {
                console.log("Customer not found!");
                navigate("/customers");
            }
        }).catch((err) => errorHandler.showError(err));
    }, []);

    function sendForm(customer: Customer) {
        customer.id = id;

        adminService.updateCustomer(customer).then((c) => {
            console.log("Customer updated!");
            navigate("/customers");
        }).catch((err) => errorHandler.showError(err));
    }

    return (
        <div className="UpdateCustomer">
            <form onSubmit={handleSubmit(sendForm)}>
                <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                        required: {message: "Must enter first name!", value: true},
                    })}
                />
                <br/>
                {formState.errors?.firstName && (
                    <span>{formState.errors?.firstName?.message}</span>
                )}

                <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                        required: {message: "Must enter last name!", value: true},
                    })}
                />
                <br/>
                {formState.errors?.lastName && (
                    <span>{formState.errors?.lastName?.message}</span>
                )}

                <input
                    type="email"
                    placeholder="Enter customer email"
                    id="email"
                    {...register("email", {
                        required: {message: "Must enter email!", value: true},
                    })}
                />
                <br/>
                {formState.errors?.email && (
                    <span>{formState.errors?.email?.message}</span>
                )}

                <input
                    type="password"
                    placeholder="Enter customer password"
                    id="password"
                    {...register("password", {
                        required: {message: "Must enter password!", value: true},
                    })}
                />
                <br/>
                {formState.errors?.password && (
                    <span>{formState.errors?.password?.message}</span>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
