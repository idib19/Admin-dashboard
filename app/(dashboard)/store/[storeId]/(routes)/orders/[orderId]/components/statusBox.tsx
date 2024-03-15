"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
    value: string
    label: string
}

const statuses: Status[] = [
    {
        value: "pending",
        label: "PENDING",
    },
    {
        value: "processing",
        label: "PROCESSING",
    },
    {
        value: "shipped",
        label: "SHIPPED",
    },
    {
        value: "delivered",
        label: "DELIVERED",
    },
    {
        value: "canceled",
        label: "CANCELLED",
    },
]

export function ComboboxPopover() {
    const [open, setOpen] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
        null
    )

    return (
        <div className="flex items-center space-x-4 p-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedStatus ? <>{selectedStatus.label}</> : <> PENDING</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandInput placeholder="Change status..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            setSelectedStatus(
                                                statuses.find((priority) => priority.value === value) ||
                                                null
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        {status.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
