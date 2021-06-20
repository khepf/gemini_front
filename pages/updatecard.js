import UpdateBaseballCard from '../components/UpdateBaseballCard';
import styled from "styled-components";

const UpdatePageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  

`;

export default function UpdateCardPage({ query }) {
  console.log(query);
  return (
    <UpdatePageStyles>
      <UpdateBaseballCard id={query.id} />
    </UpdatePageStyles>
  );
}
