"use client"

import { FormFieldslogin, schemaLogin, response } from "@/app/type/definitions";
import ButtonSubmit from "@/app/components/auth/button";
import InputField from "@/app/components/auth/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const FormLogin = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<FormFieldslogin>({
        resolver: zodResolver(schemaLogin),
    });

    const router = useRouter()
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const schemaResponse = z.object({
        StatusCode: z.number(),
        Message: z.string()
    })

    const onSubmit: SubmitHandler<FormFieldslogin> = async (data) => {
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const errorMessage: response = await response.json()

            if (response.ok) {
                setIsRedirect(true)
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

    useEffect(() => {
        if (isRedirect) {
            router.push("/")
        }
    }, [isRedirect])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col rounded-md space-y-5">

                <p className="text-2xl font-bold text-center">
                    Log in
                </p>

                <div className="flex flex-col">
                    <div className="flex flex-col space-y-4">
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
                    </div>
                </div>

                <div>
                    <ButtonSubmit
                        text="Log In"
                        isSubmitting={isSubmitting}
                        error={errors.root}
                        message={errors.root?.message!}
                    />
                </div>

                <div className="flex flex-row justify-center space-x-1 border-t border-zinc-400 pt-2 pb-3">
                    <p>Belum punya akun?</p>
                    <button
                        onClick={() => router.push("/signup")}
                        type="button"
                        className="font-bold">
                        Daftar
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormLogin;