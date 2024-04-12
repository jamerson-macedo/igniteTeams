import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLECTION } from "@storage/storageConfig";
import { PlayerGetByGroup } from "./playersGetByGroup";

export async function PlayerRemoveByGroup(playerName:string,group:string){

    try {
        //pego todo mundo
        const storage= await PlayerGetByGroup(group)
        // filtro todos que sao diferentes do nome que eu quero remover
        const filter=storage.filter(x => x.name !== playerName);
        const players=JSON.stringify(filter);
        await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`,players);
    } catch (error) {
        throw error
        
    }

}