import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLECTION, PLAYER_COLECTION } from "@storage/storageConfig";

export async function groupRemoveByName(groupName: string) {
    try {
        const storage = await groupsGetAll();
        const filter = storage.filter(group => group !== groupName)

        await AsyncStorage.setItem(GROUP_COLECTION,JSON.stringify(filter));
        await AsyncStorage.removeItem(`${PLAYER_COLECTION}-${groupName}`);
    } catch (error) {
        throw error

    }


}