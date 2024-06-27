import { FormFieldsCategory, response, schemaCategory } from "@/app/type/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEventHandler, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface typeCategory {
    status: boolean;
    setValue: ChangeEventHandler<HTMLSelectElement>;
}

interface typeOption {
    setVal: ChangeEventHandler<HTMLSelectElement>
}

const Option = ({ setVal }: typeOption) => {
    const [category, setCategory] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/bookmark/category/list", {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    const data = res.json()
                    return data
                }
            })
            .then((data) => {
                setCategory(data.Message)
            })
            .catch((err) => {
                // pass err
            })
    }, [])

    return (
        <>
            <select onChange={setVal}
                className="border text-gray-800 text-sm border-zinc-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="#">Pilih Kategori</option>
                {category.map((item) => (
                    <option key={item} value={item.replace(" ", "_")}>
                        {item}
                    </option>
                ))}
            </select>
        </>
    )
}

const SelectCatergory = ({ status, setValue }: typeCategory) => {
    const [addCategory, isAddCategory] = useState<boolean>(true)

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
        }
    } = useForm<FormFieldsCategory>({
        resolver: zodResolver(schemaCategory),
    });

    const schemaResponseError = z.object({
        StatusCode: z.number(),
        Message: z.string()
    })

    const onSubmit: SubmitHandler<FormFieldsCategory> = async (data) => {
        try {
            const formatData: FormFieldsCategory = {
                newcategory: data.newcategory.replace(" ", "_")
            }
            const response = await fetch("http://localhost:8000/bookmark/category/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formatData),
                credentials: "include"
            })

            if (!response.ok) {
                const res = await response.json()
                const errorMessage = schemaResponseError.parse(res)
                console.log(errorMessage)

                throw new Error(errorMessage.Message)
            }

            isAddCategory(!addCategory)
        } catch (error) {
            if (error instanceof Error) {
                setError("newcategory", {
                    message: error.message
                })
            }
        }
    }

    if (status) {
        return (
            <>
                <form className="flex justify-center pt-7 w-full" onSubmit={handleSubmit(onSubmit)} >
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => isAddCategory(!addCategory)}
                            className={`p-2  border-t border-l border-b border-zinc-300 
                                ${addCategory ? "hover:bg-zinc-200 rounded-l-md" :
                                    "hover:bg-red-700 hover:text-white rounded-l-md"}`}>
                            {addCategory ? "+" : "x"}
                        </button>
                    </div>

                    <div className="flex w-5/12">
                        {addCategory ?
                            <Option setVal={setValue} /> // true
                            :
                            <input
                                {...register("newcategory")}
                                className="border border-l text-gray-800 text-sm border-zinc-300 w-full p-2.5"
                                placeholder="Tambah Kategori"
                            />}
                    </div>

                    <div className="flex">
                        {addCategory ?
                            null :
                            <button type="submit"
                                className="p-2  text-sm border-t border-r border-b border-zinc-300 hover:bg-zinc-200 rounded-r-md">
                                Add
                            </button>
                        }
                    </div>
                </form>

                <div className="flex justify-center text-red-700 text-sm pt-2">
                    {errors.newcategory &&
                        <div>{errors.newcategory?.message}</div>}
                </div>
            </>
        )
    }

    return null
}

export { SelectCatergory };