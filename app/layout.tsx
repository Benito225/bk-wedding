import type { Metadata } from 'next'
import './globals.css'
import {gotham} from "@/styles/font";
import BlurCoverImage from "@/components/ BlurImage";
import Image from "next/image";

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
    <html lang="en">
      <body className={gotham.className}>
      <div className={`min-h-screen relative overflow-x-hidden`}>
          <BlurCoverImage alt={`cover-web`} imageUrl={`/images/IMG-WEB.png`}/>
          <BlurCoverImage alt={`cover-mobile`} imageUrl={`/images/IMG-MOBILE.png`}/>
          <div className={`h-[8rem] w-[8rem] md:h-[12rem] md:w-[12rem] lg:h-[14rem] lg:w-[14rem] xl:h-[20rem] xl:w-[20rem] absolute -top-3 -left-3 lg:-top-6 lg:left-0`}>
              <Image className={`object-fill`} src={`/images/FLEUR-.png`} alt={`Fleur gauche`} fill />
          </div>
          <div className={`h-[8rem] w-[8rem] md:h-[12rem] md:w-[12rem] lg:h-[14rem] lg:w-[14rem] xl:h-[18rem] xl:w-[18rem] absolute bottom-0 -right-4 lg:bottom-0 lg:-right-4`}>
              <Image className={`object-fill`} src={`/images/FLEUR-ROTATION.png`} alt={`Fleur droite`} fill />
          </div>
          {children}
      </div>
      </body>
    </html>
  )
}
