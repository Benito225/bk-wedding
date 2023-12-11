import {greatVibes} from "@/styles/font";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";

export default function PresencePage() {
  return (
      <div
          className={`bg-primary/90 min-h-[23rem] xl:min-h-[30rem] mx-auto max-w-xs md:max-w-md lg:max-w-sm xl:max-w-lg rounded-3xl px-10 py-10 xl:px-16 xl:py-16 flex flex-col items-center justify-center`}>
          <h1 className={`${greatVibes.className} text-white text-center text-7xl xl:text-9xl mb-4`}>Merci</h1>
          <Link className={`text-white text-center inline-flex items-center hover:underline text-base`} href={`/`}>
              <ChevronLeft className={`h-4`}/>
              <span>Retour</span>
          </Link>
      </div>
  )
}
