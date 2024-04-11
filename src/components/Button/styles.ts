import { TouchableOpacity } from "react-native";
import { styled, css } from "styled-components/native";
// PODE SER OU PRIMARY OU O OUTRO
export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY';


type Props = {
    type: ButtonTypeStyleProps;
}
// PASSANDO TIPAGM PARA O STYLED
export const Container = styled(TouchableOpacity) <Props>`
align-items: center;
flex:1;
min-height: 56px;
max-height: 56px;
background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
border-radius:6px;
justify-content: center;

`;

export const Title = styled.Text`
${({ theme }) => css`

font-size: ${theme.FONT_SIZE.MD}px;
color: ${theme.COLORS.WHITE};
font-family:${theme.FONT_FAMILY.BOLD}


`};


`;