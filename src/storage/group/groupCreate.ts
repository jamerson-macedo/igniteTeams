import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName:string) {
    try {
        const storedGroups=await groupsGetAll();
        // verifica se ja existe o nome
        const groupAlreadyExists = storedGroups.includes(newGroupName)
        if(groupAlreadyExists){
            throw new AppError("jã existe um grupo com esse nome.");

        }
        // converter pra salvar
        // objeto pra texto
        const storage=JSON.stringify([...storedGroups,newGroupName])
        await AsyncStorage.setItem(GROUP_COLECTION,storage);
        
    } catch (error) {
        // lanço pra quem chamou
        throw error;
        
    }
}