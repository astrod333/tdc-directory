"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
// import { createClient } from "@/db/supabase/client";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const roles = [
    {
        value: "user",
        label: "User",
    },
    {
        value: "admin",
        label: "Admin",
    },
];

interface User {
    id: string;
    full_name: string;
    avatar_url: string;
    email?: string;
    role: string;
    created_at: string;
}

export function UserRow({ user }: { user: User }) {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(user.role || "user");
    const [loading, setLoading] = useState(false);

    const handleRoleChange = async (newRole: string) => {
        setLoading(true);
        // const supabase = createClient();
        // const { error } = await supabase
        //     .from("users")
        //     .update({ role: newRole })
        //     .eq("id", user.id);

        // if (error) {
        //     console.error("Error updating role:", error);
        //     // Revert on error (optional, or show toast)
        // } else {
        setRole(newRole);
        // }
        setLoading(false);
        setOpen(false);
    };

    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={user.avatar_url} alt="Avatar" />
                    <AvatarFallback>
                        {user.full_name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell className="font-medium">
                <div className="font-medium">{user.full_name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    {user.email} {/* Email might not be in public.users, check schema */}
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="outline">{role}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(user.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[120px] justify-between"
                            disabled={loading}
                        >
                            {role === "admin" ? "Admin" : "User"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[120px] p-0">
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    {roles.map((r) => (
                                        <CommandItem
                                            key={r.value}
                                            value={r.value}
                                            onSelect={(currentValue) => {
                                                handleRoleChange(r.value);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    role === r.value ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            {r.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableRow>
    );
}
