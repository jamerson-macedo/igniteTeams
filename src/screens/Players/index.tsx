import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { PlayerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGrupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { PlayerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

// tipando o valor
type RouteParams = {
  group: string;
};
export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("time a");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();
  // pegabdo o valor da outra tela
  const route = useRoute();
  // grupo que ta vindo da outra tela
  const { group } = route.params as RouteParams;
  const newPLayerNameInputRef = useRef<TextInput>(null);
async function GroupRemove(){
  try {
    await groupRemoveByName(group);
    navigation.navigate("groups");
  } catch (error) {
   console.log(error)
   Alert.alert("Remover Grupo","não foi possivel remover o grupo")
  }

}
  async function handleGroupRemove() {
    Alert.alert("Remover", "deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      {text:"Sim", onPress:()=>GroupRemove()}
    ]);
  }
  async function handleRemovePlayer(playerName: string) {
    try {
      await PlayerRemoveByGroup(playerName, group);
      // chamo para recarregar
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover o jogador", "Não foi possivel remover o jogador");
    }
  }
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await PlayerAddByGroup(newPlayer, group);
      // remover o focus do inpuit
      newPLayerNameInputRef.current?.blur();

      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar.");
      }
    }
  }
  async function fetchPlayersByTeam() {
    try {
      const playerByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "não foi possivel carregar os players do time selecionado"
      );
    }
  } // os paramentros são uma airfunction que é o que ele precisa e o array de dependencias
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle={"adicione a galera e separe os times"}
      />
      <Form>
        <Input
          returnKeyType="done"
          onSubmitEditing={handleAddPlayer}
          inputRef={newPLayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          horizontal={true}
          data={["time a", "time b"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]} // no uiltimo item fica um vagao
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message="Não ha pessoas nesse time" />
        )}
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => {
              handleRemovePlayer(item.name);
            }}
          />
        )}
      />
      <Button title="Remover Turma" type="SECUNDARY" onPress={handleGroupRemove} />
    </Container>
  );
}
