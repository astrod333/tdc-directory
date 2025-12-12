import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import { createClient } from "@/db/supabase/server";
import { UserRow } from "./user-row";

export default async function UsersPage() {
    // const supabase = await createClient();
    // const { data: users } = await supabase
    //     .from("users")
    //     .select("*")
    //     .order("created_at", { ascending: false });
    const users: any[] = []; // Stubbed

    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                    Manage users and their roles.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
