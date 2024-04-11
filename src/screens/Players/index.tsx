import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { PlayerAddByGroup } from "@storage/players/playerAddByGroup";
import { PlayerGetByGroup } from "@storage/players/playersGetByGroup";

// tipando o valor
type RouteParams = {
  group: string;
};
export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("time a");
  const [players, setPlayers] = useState([]);
  const navigation=useNavigation();
  // pegabdo o valor da outra tela
  const route = useRoute();

  const { group } = route.params as RouteParams;

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
      const players= await PlayerGetByGroup(group);
      console.log(players)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar.");
      }
    }
  }

    return (
      <Container>
        <Header showBackButton />
        <Highlight
          title={group}
          subtitle={"adicione a galera e separe os times"}
        />
        <Form>
          <Input
            placeholder="Nome da pessoa"
            autoCorrect={false}
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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <PlayerCard name={item} onRemove={() => {}} />
          )}
        />
        <Button title="Remover Turma" type="SECUNDARY" />
      </Container>
    );
  }

