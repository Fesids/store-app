import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../context/redux/store";
import { useSelector } from "react-redux";
import { login } from "../../../context/redux/auth/authSlice";


interface LoginFormInputs {
    email: string,
    password: string
}

export const LoginForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<LoginFormInputs>();

    const dispatch = useDispatch<AppDispatch>();

    const { loading, error,message, user} = useSelector((state: RootState) => state.auth);

    //console.log(user)

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        dispatch(login(data))
    }

    const watchPassword = watch("password")

    return(
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} type="email" placeholder="Email" required></input>
                <input {...register('password')} type="password" placeholder="pasword" required></input>
                <button type="submit" disabled={loading}>
                    {loading? 'Logging in...': 'Login'}
                </button>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
            </form>

        </div>
    )
}