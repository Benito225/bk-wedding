import React from "react";
import GuestList from "@/components/GuestList";
import {fetchData} from "@/lib/api";

export default async function ListPage() {
    let data: any[] = [];
    const guestRes = await fetchData('/guest/all');

    guestRes.forEach((guest: any) => {
        data.push({
            'id': guest._id,
            'fullname': `${guest.firstname} ${guest.lastname}`,
            'mairie': guest.mairie,
            'eglise': guest.eglise,
            'reception': guest.reception
        });
    });

    return (
        <div
            className={`bg-white/95 min-h-[23rem] xl:min-h-[30rem] mx-auto max-w-5xl rounded-2xl p-7 md:px-10 md:py-10 xl:px-16 xl:py-16 my-4 xl:my-0`}>
            <GuestList data={data} />
        </div>
    );
}