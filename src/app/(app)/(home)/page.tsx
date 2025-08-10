"use client"

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

// import { useTRPC } from "@/trpc/client"
// import { useQuery } from "@tanstack/react-query"

// import { getQueryClient, trpc } from "@/trpc/server"
// export default async function Home() {

//   const queryClient = getQueryClient() 
//   const categories = await queryClient.fetchQuery(trpc.categories.getMany.queryOptions())

//   return (
//     <div>
//       Home Page
//       {JSON.stringify(categories, null, 2)}
//     </div>
//   )
// }

// The server has direct access to api, it renders much faster

// While below client side, it takes some time to fetch

export default function Home() {
  // const trpc = useTRPC() 
  // const categories = useQuery(trpc.categories.getMany.queryOptions())

  const trpc = useTRPC()
  const { data } = useQuery(trpc.auth.session.queryOptions())

  return (
    <div>
      {/* <p>Loading: {`${categories.isLoading}`}</p>
      {JSON.stringify(categories.data, null, 2)} */}
      {JSON.stringify(data?.user, null, 2)}
    </div>
  )
}