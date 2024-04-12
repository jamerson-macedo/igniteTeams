import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLECTION} from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";


export async function PlayerGetByGroup(group:string) {
    // buscar dados te que usar await
    try {

        const storage = await AsyncStorage.getItem(`${PLAYER_COLECTION}-${group}`);
        // texto para objeto
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
        console.log(`esotu aqui${players}`)

        return players;
    } catch (error) {
        throw error;
    }

}
