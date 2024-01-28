import "./UpdateCompany.css";
import Company from "../../../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import adminService from "../../../../Services/AdminService";
import {useEffect, useState} from "react";
import errorHandler from "../../../../Services/ErrorHandler";

function UpdateCompany(): JSX.Element {
    const params = useParams();
    const id = +params.id!
    const {register, handleSubmit, formState, setValue} = useForm<Company>();
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company>();


    useEffect(() => {
        adminService.getOneCompany(id).then((c) => {
            setCompany(c);
            if (c) {
                setValue("name", c.name);
                setValue("email", c.email);
                setValue("password", c.password);
            } else {
                console.log("Company not found!")
                navigate("/companies")
            }
        }).catch((err) => errorHandler.showError(err))
    }, []);


    function sendForm(company: Company) {
        company.id = id


        adminService.updateCompany(company).then((c) => {
            console.log("Company updated!")
            navigate("/companies")
        }).catch((err) => errorHandler.showError(err))

    }

    return (
        <div className="UpdateCompany">
            <form onSubmit={handleSubmit(sendForm)}>
                <input
                    type="text"
                    id="name"
                    disabled
                    {...register("name", {
                        required: {message: "Must enter name!", value: true},
                    })}
                />
                <br/>
                {formState.errors?.name && (
                    <span>{formState.errors?.name?.message}</span>
                )}

                <input
                    type="email"
                    placeholder="Enter company email"
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
                    placeholder="Enter company password"
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

export default UpdateCompany;
