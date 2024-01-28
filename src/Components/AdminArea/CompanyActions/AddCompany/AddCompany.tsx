import "./AddCompany.css";
import Company from "../../../../Models/Company";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";

function AddCompany(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Company>();
    const navigate = useNavigate();

    function sendForm(company: Company) {
        adminService
            .addCompany(company)
            .then(() => {
                console.log("Company added!");
                navigate("/companies");
            })
            .catch((e) => errorHandler.showError(e));
    }

    return (
        <div className="AddCompany">
            <form onSubmit={handleSubmit(sendForm)}>
                <input
                    type="text"
                    placeholder="Enter company name"
                    id="name"
                    {...register("name", {
                        required: { message: "Must enter name!", value: true },
                    })}
                />
                <br />
                {formState.errors?.name && (
                    <span>{formState.errors?.name?.message}</span>
                )}

                <input
                    type="email"
                    placeholder="Enter company email"
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
                    placeholder="Enter company password"
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

export default AddCompany;
