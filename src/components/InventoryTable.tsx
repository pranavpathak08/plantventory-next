"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";
import { Combobox } from "./ui/combo-box";
import { Input } from "./ui/input";
import { getPlants } from "@/actions/plant.action";
  

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
    plants: Plant
}
    
  
export default async function InventoryTable({plants} : InventoryTableProps) {

    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    //Filtering plants by name and category (if selected)
    const filteredPlants = plants?.userPlants?.filter((plant) => (
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || plant.category === selectedCategory)
    ));

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        placeholder="Filter plants..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    <Search className="absolute h-4 w-w4 left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <Combobox
                    value={selectedCategory}
                    onChange={(val) => setSelectedCategory(val)}
                />


            </div>

            <Table>
            <TableHeader>
                <TableRow>
                        <TableHead>Plant ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredPlants?.map((plant) => (
                    <TableRow key={plant.id}>
                        <TableCell>{plant.id}</TableCell>
                        <TableCell>{plant.name}</TableCell>
                        <TableCell>{plant.category}</TableCell>
                        <TableCell>{plant.price}</TableCell>
                        <TableCell className="font-bold">{plant.stock}</TableCell>
                        
                        <TableCell className="text-right">
                            <div className="flex justify-end space-x-4">
                                <h1>Edit Button</h1>
                                <h1>Delete Button</h1>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
}
  