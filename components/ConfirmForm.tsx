"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {Check, ChevronLeft, ChevronsUpDown} from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import BeatLoader from 'react-spinners/BeatLoader';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { toast } from "@/components/ui/use-toast"
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox"
import React, {useEffect} from "react";
import {fetchData} from "@/lib/api";
import {useRouter} from "next/navigation";

let items = [
    {
        id: "mairie",
        label: "Mairie",
    },
    {
        id: "eglise",
        label: "Église",
    },
    {
        id: "reception",
        label: "Réception",
    }
]

// let invites = [
//     { label: "English", value: "en" },
//     { label: "French", value: "fr" }
// ]

const FormSchema = z.object({
    invite: z.string({
        required_error: "Vous devez entrez votre nom",
    }),
    items: z.array(z.string())
    // items: z.array(z.string()).refine((value) => value.some((item) => item), {
    //     message: "You have to select at least one item.",
    // })
})

export default function ConfirmForm() {
    const [open, setOpen] = React.useState(false)
    const [isBusy, setBusy] = React.useState(false)
    const [displayCheck, setDisplayCheck] = React.useState(false)
    const [invites, setInvites] = React.useState<{label: string, value: string}[]>([])
    const [search, setSearch] = React.useState("")

    const router = useRouter();

    useEffect( () => {

        const getGuestList = async () => {
            const url = '/guest/search?search='+search;
            setDisplayCheck(false);

            if (search.length > 2) {
                const invitesFound = await fetchData(url);
                setInvites(invitesFound);
            } else {
                setInvites([]);
            }
        }

        getGuestList();

    }, [search]);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
        },
    })

    async function selectGuestInfo(guestId: string) {
        setDisplayCheck(false);

        const url = '/guest/find/'+guestId;
        const guest = await fetchData(url);
        const items: string[] = [];

        if (guest.mairie) {
            items.push('mairie')
        }

        if (guest.eglise) {
            items.push('eglise')
        }

        if (guest.reception) {
            items.push('reception')
        }

        form.setValue("items", items);

        setDisplayCheck(true);
    }

    async function updateSearchValue(event: any) {
        const value = event.target.value;
        setSearch(value);
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setBusy(true);

        try {
            const updatePresence = await fetchData(`/guest/update-presence`, "POST", data);
            setTimeout(() => {
                router.push('/response-submit');
            }, 1500) ;
        } catch (error: any) {
            setBusy(false);
            console.log(error);
            toast({
                variant: "destructive",
                title: "Un problème a survenu !",
                description: "Veuillez réessayez plus tard SVP."
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                    control={form.control}
                    name="invite"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            {/*<FormLabel className={`text-base font-bold tracking-tighter`}>Invité</FormLabel>*/}
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full tracking-tighter h-12 rounded-full text-base justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? invites.find(
                                                    (invite) => invite.value === field.value
                                                )?.label
                                                : "Entrez votre nom"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align={`start`} className="w-80 p-0 tracking-tighter">
                                    <Command>
                                        <CommandInput onKeyUp={updateSearchValue} placeholder="Recherchez un nom..." />
                                        <CommandEmpty>Invité non trouvé.</CommandEmpty>
                                        <CommandGroup>
                                            {invites.map((invite) => (
                                                <CommandItem
                                                    value={invite.label}
                                                    key={invite.value}
                                                    onSelect={() => {
                                                        form.setValue("invite", invite.value)
                                                        setOpen(false)
                                                        selectGuestInfo(invite.value)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            invite.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {invite.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage className={`mt-2`} />
                        </FormItem>
                    )}
                />
                {displayCheck ? <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-3 mt-5">
                                <FormLabel className="text-base font-bold tracking-tighter">Lieu de présence</FormLabel>
                            </div>
                            {items.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-center space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-base md:text-lg">
                                                    {item.label}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                /> : '' }
                <div className={`text-center mt-10`}>
                    <button disabled={isBusy}
                        className={`tracking-tighter rounded-full block w-full text-base !leading-5 md:text-lg py-4 px-6 text-white text-center bg-primary hover:bg-primary/90 duration-300 mb-3`}
                        type="submit">
                        {isBusy ? <BeatLoader color={"#fff"} size={`10`} /> : 'Confirmer votre présence'}
                    </button>
                    <Link
                        className={`text-primary text-center inline-flex items-center hover:underline text-sm md:text-base`}
                        href={`/`}>
                        <ChevronLeft className={`h-4`}/>
                        <span>Retour</span>
                    </Link>
                </div>

            </form>
        </Form>
    );
}