import Router from 'next/router';
import styled from "styled-components";

const ButtonStyles = styled.button`
  width: auto;
background: darkBlue;
color: white;
border: 0;
font-size: 2rem;
font-weight: 600;
padding: 0.5rem 1.2rem;
`;

export default function CreateBaseballCardButton() {
  
  function redirectToNewBaseballCardPage() {
    Router.push({
      pathname: `/newbaseballcard`
    });
  }

  return (
    <ButtonStyles type="button" onClick={redirectToNewBaseballCardPage}>
      + Add Baseball Card
    </ButtonStyles>
  );
}
