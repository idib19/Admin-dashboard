import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

// Ce fichier page.tsx represente le composant principal qui sera rendu lors de l'acces a la route/page storeId/settings
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {

    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    // checking the role and authorix=zation
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            
        }
    })

    if (!store) {
        redirect('/');
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>

    )
}

export default SettingsPage;