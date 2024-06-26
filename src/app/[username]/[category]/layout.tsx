import NavBar from "@/app/components/navbar";

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