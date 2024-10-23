import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../context/redux/store";
import { useSelector } from "react-redux";
import { signup } from "../../../context/redux/auth/authSlice";

interface SignupFormatInputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string
}

export const SignUpForm = () => {

    const { register, handleSubmit } = useForm<SignupFormatInputs>();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, message } = useSelector((state: RootState) =>state.auth);

    const onSubmit: SubmitHandler<SignupFormatInputs> = (data) => {
        dispatch(signup(data))
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('firstName')} type="text" placeholder="firstName" required />
                <input {...register('lastName')} type="text" placeholder="lastName" required />
                <input {...register('email')} type="email" placeholder="Email" required></input>
                <input {...register('password')} type="password" placeholder="Password" required/>
                <input {...register('rePassword')} type="password" placeholder="RePassword" required />

                <button type="submit" disabled={loading}>
                    {loading? 'Signing up...': 'Signup'}
                </button>
                {error && <p className="">{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}