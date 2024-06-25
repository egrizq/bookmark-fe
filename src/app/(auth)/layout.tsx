import NavBar from "../components/navbar";

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