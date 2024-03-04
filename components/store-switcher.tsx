
"use client"

import { Store } from "@/app/types/Store"
import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useParams, useRouter } from "next/navigation"
import { useModal } from "@/app/hooks/useModal"


type StoreSwitcherProps = {
    items: Store[]
}
export function StoreSwitcher({ items = [] }: StoreSwitcherProps) {
    const router = useRouter();
    const params = useParams();
    const storeModal = useModal();
    const onStoreSelect = (store: { id: string, name: string }) => {
        setOpen(false);
        router.push(`/${store.id}`);
    };

    const currentStore = items.find((item) => item.id === params.storeId);

    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {currentStore?.name}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Pesquisa a loja..." />
                        <CommandEmpty>Nenhuma loja encontrada</CommandEmpty>
                        <CommandGroup heading="Lojas">
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => onStoreSelect(item)}
                                    className="text-sm"
                                >
                                    <div className="flex flex-1">
                                        <StoreIcon className="mr-2 h-5 w-5" />
                                        {item.name}
                                    </div>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            currentStore?.id === item.id ? "opacity-100" : "opacity-0"
                                        )}

                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup >
                            <CommandItem
                                className="cursor-pointer"
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.openModal()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Criar loja
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
