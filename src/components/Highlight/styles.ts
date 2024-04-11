import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin: 32px 0;
  `;

export const Title = styled.Text`
${({ theme }) => css`

font-size: ${theme.FONT_SIZE.XL}px;
  text-align: center;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: white;

`};
`;
export const Subtitle = styled.Text`
${({ theme }) => css`
font-size: ${ theme.FONT_SIZE.MD}px;
  text-align: center;
  font-family: ${ theme.FONT_FAMILY.REGULAR};
  color:  ${ theme.COLORS.GRAY_300};

`};
`;
