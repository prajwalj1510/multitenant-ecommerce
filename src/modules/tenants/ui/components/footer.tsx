import Link from "next/link"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"


const logoFont = Poppins({
  subsets:["latin"],
  weight:["400","500","600","700"]
})


export const Footer = () => {
  return (
    <footer className=" border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center gap-2 py-6 h-full px-4 lg:px-12">
        <p>Powered by</p>
        <Link href='/'>
          <span className={cn('text-2xl font-semibold', logoFont.className)}>
            funRoad
          </span>
        </Link>
      </div>

    </footer>
  )
}