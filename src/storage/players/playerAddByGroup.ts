import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PLAYER_COLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PlayerGetByGroup } from "./playersGetByGroup";

export async function PlayerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  /*
    Logica / @ignite-teams:players:[]
    @ignite-teams:players-amigos:[]
    @ignite-teams:players-rocket:[]
    */
  try {
    const storedPlayers = await PlayerGetByGroup(group);

    const playersAllReadyExists = storedPlayers.filter(player => player.name === newPlayer.name);
    if(playersAllReadyExists.length >  0){

      throw new AppError("Essa pessoa ja esta adicionada em um time aqui")
    }
    const storage=JSON.stringify([...storedPlayers,newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`,storage);

  } catch (error) {
    throw error;

  }

}