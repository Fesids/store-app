import React, { useState } from "react";
import { useForm } from "react-hook-form";


interface LoginFormInputs {
    email: string,
    password: string
}

export const LoginForm: React.FC = () => {

    const [user, setUser] = useState<any>();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<LoginFormInputs>();

    const watchPassword = watch("password")

    return(
        <div>

        </div>
    )
}