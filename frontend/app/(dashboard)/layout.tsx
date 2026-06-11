import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/layout/Navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar/>

            <ProtectedRoute>
                <main>{children}</main>
            </ProtectedRoute>
        </>
    );
}