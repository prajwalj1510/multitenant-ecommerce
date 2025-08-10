"use client"
import { useTRPC } from "@/trpc/client";
import { CustomCategory } from "../types";
import { Categories } from "./Categories";
import { SearchInput } from "./SearchInput";
import { useSuspenseQuery } from "@tanstack/react-query";

// interface SearchFiltersProps {
//     data: CustomCategory[];
// }

export const SearchFilters = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" 
            style={{backgroundColor: '#F5F5F5' }}
        >

            <SearchInput /> 
            {/* Hydration error in above red line */}

            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
        </div>
    )
}

export const SearchFiltersLoading = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{backgroundColor: '#F5F5F5'}}>

            <SearchInput disabled/> 
            {/* Hydration error in above red line */}

            <div className="hidden lg:block">
                <div className="h-11" />
            </div>
        </div>
    )
}