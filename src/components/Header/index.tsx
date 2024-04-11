import { BackIcon, Container, Logo, BackButton } from "./styles";
import logoimg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native"; 
type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {

  const navigation = useNavigation();
function handlerGoBack(){
  navigation.navigate("groups"); // tem tbm o poptop que volta pra o inicio
}

  return (


    <Container>
      {// se for verdadeiro
      showBackButton && 
        <BackButton onPress={handlerGoBack}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoimg} />
    </Container>
  );
}
