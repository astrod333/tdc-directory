"use client";

import { Check, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { createClient } from "@/db/supabase/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Product {
    id: string;
    full_name: string;
    punchline: string;
    logo_src: string;
    approved: boolean;
    featured: boolean;
    created_at: string;
}

export function ProductRow({ product }: { product: Product }) {
    const [approved, setApproved] = useState(product.approved);
    const [featured, setFeatured] = useState(product.featured);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (updates: any) => {
        setLoading(true);
        // const supabase = createClient();
        // const { error } = await supabase
        //     .from("products")
        //     .update(updates)
        //     .eq("id", product.id);

        // if (error) {
        //     console.error("Error updating product:", error);
        // } else {
        if (updates.approved !== undefined) setApproved(updates.approved);
        if (updates.featured !== undefined) setFeatured(updates.featured);
        // }
        setLoading(false);
    };

    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                {product.logo_src ? (
                    <Image
                        alt="Product logo"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.logo_src}
                        width="64"
                    />
                ) : (
                    <div className="h-16 w-16 bg-muted rounded-md" />
                )}
            </TableCell>
            <TableCell className="font-medium">
                {product.full_name}
                <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {product.punchline}
                </div>
            </TableCell>
            <TableCell>
                <Badge variant={approved ? "default" : "secondary"}>
                    {approved ? "Approved" : "Pending"}
                </Badge>
            </TableCell>
            <TableCell>
                <Badge variant={featured ? "default" : "outline"}>
                    {featured ? "Featured" : "Standard"}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(product.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => handleUpdate({ approved: !approved })}
                            disabled={loading}
                        >
                            {approved ? "Reject" : "Approve"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleUpdate({ featured: !featured })}
                            disabled={loading}
                        >
                            {featured ? "Unfeature" : "Feature"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
