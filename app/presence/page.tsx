import {greatVibes} from "@/styles/font";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import ConfirmForm from "@/components/ConfirmForm";

export default function PresencePage() {
  return (
      <div
          className={`bg-white/90 min-h-[23rem] xl:min-h-[30rem] mx-auto max-w-xs md:max-w-md lg:max-w-sm xl:max-w-lg rounded-3xl p-6 md:px-10 md:py-10 xl:px-16 xl:py-16 flex flex-col items-center`}>
          <h1 className={`${greatVibes.className} text-black text-center text-4xl xl:text-5xl`}>Kevine Barbara <br/>
              <span className={`text-primary`}>&</span> Ben Kader</h1>
          <p className={`text-center !leading-5 mt-4 md:mt-5 text-base md:text-lg mb-8 tracking-tighter`}>Veuillez entrer votre nom et choisir les endroits où vous serez présent</p>


          <div className={`w-full`}>
            <ConfirmForm />
          </div>

          {/*<div className={`w-full text-center`}>*/}
          {/*    <Link className={`tracking-tighter rounded-full block w-full text-base !leading-5 md:text-lg py-4 px-6 text-white text-center bg-primary hover:bg-primary/90 duration-300 mb-3`} href={`/`}>Confirmer votre présence</Link>*/}
          {/*    <Link className={`text-primary text-center inline-flex items-center hover:underline text-sm md:text-base`} href={`/`}>*/}
          {/*        <ChevronLeft className={`h-4`}/>*/}
          {/*        <span>Retour</span>*/}
          {/*    </Link>*/}
          {/*</div>*/}
      </div>
  )
}
