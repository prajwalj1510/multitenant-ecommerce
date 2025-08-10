"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CustomCategory } from "../types"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { CategoriesGetManyOutput } from "@/modules/categories/types"

interface CategoriesSidebarProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    // data: CustomCategory[],
}

const CategoriesSidebar = ({
    open,
    onOpenChange,
    // data 
}: CategoriesSidebarProps) => {

    const trpc = useTRPC()
    const { data } = useQuery(trpc.categories.getMany.queryOptions())

    const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<CategoriesGetManyOutput[0] | null>(null)

    const router = useRouter()

    // If we have parent category , show those, otherwise show root categories

    const currentCategories = parentCategories ?? data ?? []

    const handleOpenChange = (open: boolean) => {
        setSelectedCategories(null)
        setParentCategories(null)
        onOpenChange(open)
    }

    const handleCategoryClick = (category: CategoriesGetManyOutput[0]) => {

        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CategoriesGetManyOutput)
            setSelectedCategories(category)
        } else {
            // This is a Leaf category (no subcategories) 

            if (parentCategories && selectedCategories) {
                //This is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategories.slug}/${category.slug}`)
            } else {
                //This is main category - navigate to /category

                if (category.slug === 'all') {
                    router.push(`/`)
                } else {
                    router.push(`/${category.slug}`)
                }
            }

            handleOpenChange(false)
        }
    }

    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null)
            setSelectedCategories(null)
        }
    }

    const backgroundColor = selectedCategories?.color || 'white'

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <Button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                        >
                            <ChevronLeftIcon className="size-5 mr-2" />
                            Back
                        </Button>
                    )}
                    {currentCategories.map((category) => (
                        <Button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left p-4 bg-transparent text-black hover:bg-black hover:text-white flex items-center justify-between text-base font-medium border-none cursor-pointer"
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-5 mr-2" />
                            )}

                        </Button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default CategoriesSidebar
