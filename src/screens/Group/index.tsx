import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { useEffect, useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";
export function Groups() {
  // valor inicial
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }
  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }
  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
     
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possivel carregar as turmas");
    }finally{
      setIsLoading(false);
    }
  } // o que carregar e paramentro do que
  useFocusEffect(
    useCallback(() => {
      console.log("usefocus rodou");
      fetchGroups();
    }, [])
  ); // chave para tudo que eu colocar aqui e atualixar ele executa novamente

  return (
    <Container>
      <Header />
      <Highlight title={"Turmas"} subtitle={"Jogue com a sua turma"} />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={groups.length === 0 && { flex: 1 }} // se a lista for vazia entao o tamanho fica grande
          ListEmptyComponent={() => (
            <ListEmpty message="Cadastre sua Primeira turma" />
          )}
          data={groups} // os dados
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )} // chaave de cada item
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
