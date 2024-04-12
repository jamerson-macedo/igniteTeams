import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
    // buscar dados tem que usar await
    try {


        const storage = await AsyncStorage.getItem(GROUP_COLECTION);
        // texto para objeto
        const groups: string[] = storage ? JSON.parse(storage) : [];

        return groups;
    } catch (error) {
        throw error;
    }

}