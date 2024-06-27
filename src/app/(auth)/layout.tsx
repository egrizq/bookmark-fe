import NavBar from "../components/auth/navbar";

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}