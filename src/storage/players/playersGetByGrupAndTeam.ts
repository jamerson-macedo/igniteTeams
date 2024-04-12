import  { PlayerGetByGroup } from './playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, team: string){
    try {
        const storage= await PlayerGetByGroup(group);
        //filtro por timme
        const players = storage.filter(player=> player.team=== team)
        return players;
        
    } catch (error) {
        throw error;
        
    }

}