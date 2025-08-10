// import { Category } from "@/payload-types";
import { Suspense } from "react";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import { SearchFilters, SearchFiltersLoading } from "./search-filters";

// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import { CustomCategory } from "./types";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {

  // const payload = await getPayload({
  //   config: configPromise,
  // })

  // const data = await payload.find({
  //   collection: 'categories',
  //   depth: 1, // Populate subcategories
  //   pagination: false,
  //   where: {
  //     parent: {
  //       exists: false,
  //     }
  //   },
  //   sort: 'name',
  // })

  // const formattedData : CustomCategory[] = data.docs.map((doc) => ({
  //     ...doc,
  //     subcategories: (doc.subcategories?.docs ?? [].map((doc) =>({
  //       ...(doc as Category),
  //       subcategories: undefined,
  //     })))
  // }))

  // console.log(data, formattedData);

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <SearchFilters data = {formattedData} /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default layout
