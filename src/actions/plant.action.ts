"use server"

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getPlants(searchTerm?: String) {
    try {
        const currentUserId = await getUserId();

        const whereClause: any = {
            userId: currentUserId
        }

        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive"
            };
        }

        const userPlants = await prisma.plant.findMany({
            where: whereClause 
        })
        
        revalidatePath("/");
        return { success: true, userPlants }; 

    } catch (error) {
        console.log("Error in fetching plants", error);
        throw new Error("Failed to fetch plants");
    }
}

export async function getPlantById(id: string) {
    return await prisma.plant.findUnique({
        where: { id }
    });
}

