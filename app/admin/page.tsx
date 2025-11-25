import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/db/supabase/server";

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { count: userCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

    const { count: productCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

    const { count: pendingProductCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("approved", false);

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{userCount || 0}</div>
                    <p className="text-xs text-muted-foreground">
                        Registered users on the platform
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{productCount || 0}</div>
                    <p className="text-xs text-muted-foreground">
                        Products submitted to the directory
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingProductCount || 0}</div>
                    <p className="text-xs text-muted-foreground">
                        Products waiting for review
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
