import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ fDirection }) =>
    fDirection ? fDirection : "transparent"};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
  color: ${({ color }) => (color ? color : "unset")};
`;

export const Wrapper = styled.div`
  padding: ${({ pd }) => (pd ? pd : "unset")};
  width: ${({ width }) => (width ? width : "unset")};
  margin: ${({ mg }) => (mg ? mg : "unset")};
  max-width: ${({ mWidth }) => (mWidth ? mWidth : "1024px")};
  display: ${({ dflex }) => (dflex ? dflex : "unset")};
  flex-direction: ${({ fDirection }) => (fDirection ? fDirection : "unset")};
  align-items: ${({ alItems }) => (alItems ? alItems : "unset")};
  justify-content: ${({ jContent }) => (jContent ? jContent : "unset")};
  gap: ${({ gap }) => (gap ? gap : "unset")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "unset")};
  border-radius: ${({ bRadius }) => (bRadius ? bRadius : "unset")};
  box-shadow: ${({ bShadow }) => (bShadow ? bShadow : "unset")};
  color: ${({ color }) => (color ? color : "unset")};
`;

export const InputWrapper = styled.div`
  width: ${({ width }) => (width ? width : "100%")};
  display: flex;
  flex-direction: ${({ fDirection }) => (fDirection ? fDirection : "unset")};
  align-items: ${({ aItems }) => (aItems ? aItems : "unset")};
  justify-content: ${({ jContent }) => (jContent ? jContent : "unset")};
  gap: ${({ gap }) => (gap ? gap : "0.3rem")};
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  font-size: 17px;
  padding: ${({ pd }) => (pd ? pd : "0.7rem 0.5rem")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#F1F1F1")};
  outline-color: var(--green);
  border: none;
`;

export const Select = styled.select`
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "unset")};
  height: ${({ height }) => (height ? height : "unset")};
  border-radius: ${({ bRadius }) => (bRadius ? bRadius : "5px")};;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "17px !important")};
  padding: ${({ pd }) => (pd ? pd : "0.7rem 0.5rem")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#F1F1F1")};
  outline-color: var(--yellow);
  border: none;
  box-shadow: ${({ boxShadow }) => (boxShadow === "true" ? "var(--boxshadow)" : "unset")};
  outline-color: var(--yellow);
  border: none;
  filter: ${({ filter }) => (filter === "true" ? 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))' : 'unset')};
  outline-color: var(--yellow);
`;

export const Option = styled.option`
  border: none;
`;



export const DropdownLink = styled.div`
  display: ${({ dflex }) => (dflex ? dflex : "unset")};
  flex-direction: ${({ fDirection }) => (fDirection ? fDirection : "unset")};;
  gap: ${({ gap }) => (gap ? gap : "unset")};;
  position: absolute;
  width:100%;
  top: 23px;
  left: 0;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 5;
  border-radius: 3px;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.1s ease-in;

`

export const DropdownLinks = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: white;

  &:hover ${DropdownLink}{
  transform: scaleY(1);
  }
  
`
export const DropdownTitle = styled.p`
  margin: ${({ mg }) => (mg ? mg : "0 !important")};
  padding: ${({ pd }) => (pd ? pd : "0 !important")};
  cursor: pointer;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "unset")};
  cursor: pointer;;

`


export const DropdownItem = styled.p`
  margin: ${({ mg }) => (mg ? mg : "0 !important")};
  padding: ${({ pd }) => (pd ? pd : "0 !important")};
  color:black;
  font-size: 13px;
`

export const TextArea = styled.textarea`
  padding: ${({ pd }) => (pd ? pd : "0.3rem")};
  outline-color: ${({ outlineColor }) => (outlineColor ? outlineColor : "var(--green)")};
`
export const Form = styled.form`
  display: flex;
  flex-direction: ${({ fDirection }) => (fDirection ? fDirection : "unset")};
  align-items: ${({ aItems }) => (aItems ? aItems : "unset")};
`



