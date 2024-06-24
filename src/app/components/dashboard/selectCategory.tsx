import { FormFieldsCategory, schemaCategory } from "@/app/auth/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface typeCategory {
    status: boolean;
    setValue: ChangeEventHandler<HTMLSelectElement>;
}


const Option = ({ setVal }: { setVal: ChangeEventHandler<HTMLSelectElement> }) => {
    return (
        <>
            <select onChange={setVal}
                className="border text-gray-800 text-sm border-zinc-300  rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="#">Pilih kategori</option>
            </select>
        </>
    )
}

const Input = ({ status, setStatus }: { status: boolean, setStatus: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<FormFieldsCategory>({
        resolver: zodResolver(schemaCategory)
    })

    const onSubmit: SubmitHandler<FormFieldsCategory> = (data) => {
        let res = JSON.stringify(data)
        alert(res)
    }


    if (!status) {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex">
                    <button type="button" onClick={setStatus}
                        className="p-2 text-sm border-t border-l border-b border-zinc-300 hover:bg-red-700 hover:text-white rounded-l-md">
                        x
                    </button>
                    <input
                        {...register("input")}
                        className="border border-l text-gray-800 text-sm border-zinc-300 w-full p-2.5"
                        placeholder="Add Kategori"
                    />
                    <button type="submit"
                        className="p-2 text-sm border-t border-r border-b border-zinc-300 hover:bg-zinc-200 rounded-r-md">
                        Add
                    </button>
                </form>
                {errors.input && <div className="text-red-500 text-sm">{errors.input.message}</div>}

            </>
        )
    }
}

const SelectCatergory = ({ status, setValue }: typeCategory) => {
    const [addCategory, isAddCategory] = useState<boolean>(true)

    if (status) {
        return (
            <>
                <div className="flex justify-center pt-7">

                    {addCategory! ?
                        <button onClick={() => isAddCategory(!addCategory)}
                            className="p-2 border-t border-l border-b border-zinc-300 hover:bg-zinc-200 rounded-l-md">
                            +
                        </button> : null}

                    <div className="flex w-4/12">
                        {addCategory ?
                            <Option setVal={setValue} />
                            :
                            <Input status={addCategory} setStatus={() => isAddCategory(!addCategory)} />}
                    </div>
                </div>
            </>
        )
    }

    return null

}

export { SelectCatergory };