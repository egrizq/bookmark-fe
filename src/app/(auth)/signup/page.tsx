import FormSignUp from "./form";

export default function SignUp() {
    return (
        <>
            <div className="container mx-auto space-y-3 pt-14 items-center">
                <div className="flex justify-center pb-10">

                    <div className="flex w-4/12 px-8 bg-white pt-5 pb-7 rounded-lg border border-zinc-300 justify-center">
                        <FormSignUp />
                    </div>
                </div>
            </div>
        </>
    );
}
