import { getPlantById } from "@/actions/plant.action"
import PlantCard from "./PlantCard"

export default async function Page({ params }: { params: { slug: string } }) {
    

    const [id] = params.slug.split("--");
    const plant = await getPlantById(id);
    return (

        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-full">
                <PlantCard plant={plant} />
            </div>
        </div>
    )
}