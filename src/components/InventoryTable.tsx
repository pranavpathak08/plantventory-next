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
import { useRouter } from "next/navigation";
  

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
    plants: Plant
}
    
  
export default function InventoryTable({plants} : InventoryTableProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    //Filtering plants by name and category (if selected)
    const filteredPlants = plants?.userPlants?.filter((plant) => (
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || plant.category.toLowerCase() === selectedCategory.toLowerCase())

        // console.log(`Plant: ${plant.name}, Category: "${plant.category}", Selected: "${selectedCategory}", Match: ${categoryMatch}`);
    ));

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 py-4">
                <div className="relative max-w-sm w-full">
                    <Input
                        placeholder="Filter plants by name..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
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
                    {filteredPlants?.map((plant) => {

                        const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
                        const slug = `${plant.id}--${slugifiedName}`;
                        const plantUrl = `/plants/${slug}`;
                        
                        return (
                            <TableRow key={plant.id} onClick={() => router.push(plantUrl)}>
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
                        )
                    })}
            </TableBody>
        </Table>
        </div>
    );
}
  