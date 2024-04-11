import { Groups } from "@screens/Group";
import theme from "@theme/index";
import { ThemeProvider } from "styled-components/native";
import { Loading } from "@components/Loading";
import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { Routes } from "@components/routes";
export default function App() {

  // carrego as fontes globalmente no app
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });
  return (
    // configurando o thema globalmente
    // verifico se as fontes foram carregadas se n ele mostra carregando
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} translucent/>
      {fontsLoaded ? <Routes/> : <Loading />}
    </ThemeProvider>
  );
}
