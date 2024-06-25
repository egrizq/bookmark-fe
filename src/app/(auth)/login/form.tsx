"use client"

import { FormFieldslogin, schemaLogin, response } from "@/app/auth/definitions";
import ButtonSubmit from "@/app/components/button";
import InputField from "@/app/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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

            if (response.ok) {
                setIsRedirect(true)
            } else {
                const res: response = await response.json()
                throw new Error(JSON.stringify(res))
            }
        } catch (error) {
            const errorMessage = (JSON.parse((error as Error).message) as response).Message;
            setError("root", {
                type: 'manual',
                message: errorMessage,
            })
        }
    }

    if (isRedirect) {
        router.push("/")
    }

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