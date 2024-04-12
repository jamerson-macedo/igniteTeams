import { Highlight } from "@components/Highlight";
import { Container, Content } from "./styles";
import { Header } from "@components/Header";

import { useState } from "react";

import { Button } from "@components/Button";
import { Icon } from "@components/GroupCard/styles";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();
  
  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert(" Novo Grupo", "informe o nome da turma");
      }
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert(" Novo Grupo", error.message);
      } else {
        Alert.alert(" Novo Grupo", "Não foi possivel criar um grupo");
        console.log(error);
      }
    }
  }


  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />

        <Highlight
          title={"Nova turma"}
          subtitle={"Crie a turma para adicionar pessoas"}
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
