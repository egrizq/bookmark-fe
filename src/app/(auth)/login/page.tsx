import FormLogin from "./form";

const Login = () => {

    return (
        <>
            <main className="flex-col space-y-3 w-full h-full flex pt-16 items-center">
                <div className="flex flex-row py-2 space-x-1 bg-white border border-zinc-300 text-center rounded-lg w-80 justify-center">
                    <img src="/google.svg" alt="google" width={23} />
                    <p>Soon</p>
                </div>

                <div className="flex bg-white py-5 rounded-lg border border-zinc-300 w-80 justify-center">
                    <FormLogin />
                </div>
            </main>
        </>
    )
}

export default Login;