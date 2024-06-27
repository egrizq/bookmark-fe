"use client"

import { FormFieldsSignUp, schemaSignUp, bodyRequest, response } from "@/app/type/definitions";
import ButtonSubmit from "@/app/components/auth/button";
import InputField from "@/app/components/auth/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const FormSignUp = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<FormFieldsSignUp>({
        resolver: zodResolver(schemaSignUp),
    })

    const [checkResponse, setCheckResponse] = useState(false);
    const router = useRouter()
    const schemaResponse = z.object({
        StatusCode: z.number(),
        Message: z.string()
    })

    const onSubmit: SubmitHandler<FormFieldsSignUp> = async (data) => {
        try {
            const responseData: bodyRequest = {
                username: data.username,
                password: data.password,
                email: data.email
            }

            const response = await fetch("http://localhost:8000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(responseData),
                credentials: "include"
            })
            const errorMessage: response = await response.json()

            if (response.ok) {
                setCheckResponse(true)
            } else {
                const message = schemaResponse.parse(errorMessage)
                throw new Error(message.Message)
            }
        } catch (error) {
            if (error instanceof Error) {
                setError("root", {
                    type: 'manual',
                    message: error.message,
                })
            }
        }
    }

    // redirect
    useEffect(() => {
        if (checkResponse) {
            router.push("/")
        }
    }, [checkResponse, setCheckResponse])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col rounded-md space-y-5">

                <p className="text-2xl font-bold text-center">
                    Create your account
                </p>

                <div className="flex flex-col">
                    <div className="flex flex-col space-y-4">
                        <InputField
                            label="Email"
                            id="email"
                            register={register}
                            error={errors.email} />
                        <InputField
                            label="Username"
                            id="username"
                            register={register}
                            error={errors.username} />
                        <InputField
                            label="Password"
                            id="password"
                            register={register}
                            error={errors.password} />
                        <InputField
                            label="Password Confirmation"
                            id="passwordConf"
                            register={register}
                            error={errors.passwordConf} />
                    </div>
                </div>

                <ButtonSubmit
                    text="Sign Up"
                    isSubmitting={isSubmitting}
                    error={errors.root}
                    message={errors.root?.message!}
                />
            </form>
        </>
    )
}

export default FormSignUp;