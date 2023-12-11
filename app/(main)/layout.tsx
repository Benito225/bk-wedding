import type { Metadata } from 'next'
import '../globals.css'
import {gotham} from "@/styles/font";
import BlurCoverImage from "@/components/ BlurImage";
import Image from "next/image";
import Providers from "@/app/providers";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "BK's Wedding Day",
  description: 'Invitation et confirmation de présence au mariage de Ben Kader & Kévine Bongba',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={gotham.className}>
      <Providers>
          <div className={`min-h-screen relative flex justify-center items-center overflow-x-hidden`}>
              <BlurCoverImage alt={`cover-web`} imageUrl={`/images/IMG-WEB.png`}/>
              <BlurCoverImage alt={`cover-mobile`} imageUrl={`/images/IMG-MOBILE.png`}/>
              <div className={`h-[8rem] w-[8rem] md:h-[12rem] md:w-[12rem] lg:h-[12rem] lg:w-[12rem] xl:h-[16rem] xl:w-[16rem] absolute -top-3 -left-3 lg:-top-6 lg:left-0 block 2xl:hidden`}>
                  <Image className={`object-fill`} src={`/images/FLEUR-.png`} alt={`Fleur gauche`} fill />
              </div>
              <div className={`h-[8rem] w-[8rem] md:h-[12rem] md:w-[12rem] lg:h-[14rem] lg:w-[14rem] xl:h-[16rem] xl:w-[16rem] absolute bottom-0 -right-4 lg:bottom-0 lg:-right-4 block 2xl:hidden`}>
                  <Image className={`object-fill`} src={`/images/FLEUR-ROTATION.png`} alt={`Fleur droite`} fill />
              </div>
              <div className={`w-full`}>
                  <div className={`w-full lg:w-[50%]`}>
                      {children}
                  </div>
              </div>
          </div>
          <Toaster />
      </Providers>
      </body>
    </html>
  )
}
