"use client"
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import CategoriesSidebar from "./CategoriesSidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SearchInputProps {
    disabled?:boolean ;
    // data: CustomCategory[] 
}

export const SearchInput = ({disabled}:SearchInputProps) => {

    const [isSidebarOpen , setIsSidebarOpen] = useState(false)

    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions())

    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
            <div className="relative w-full">
                <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"/>
                <Input className="pl-8" placeholder="Search products..." disabled={disabled} />
            </div>

            {/* TODO: Add category view all button */}
            <Button
                variant='elevated'
                className="size-12 shrink-0 flex lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon />
            </Button>

            {session.data?.user && (
                <Button
                    asChild
                    variant='elevated'
                >
                    <Link href='/library'>
                        <BookmarkCheckIcon />
                        Library
                    </Link>
                </Button>
            )}

            {/* TODO: Add library button */}
        </div>
    )
}