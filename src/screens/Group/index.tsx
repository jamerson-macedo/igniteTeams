import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
export function Groups() {
  // valor inicial
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }
  function handleOpenGroup(group:string) {
    navigation.navigate("players",{group})


  }
  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
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
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }} // se a lista for vazia entao o tamanho fica grande
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre sua Primeira turma" />
        )}
        data={groups} // os dados
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={()=> handleOpenGroup(item)}/>} // chaave de cada item
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
