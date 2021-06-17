import { useUser } from "./User";
import styled from "styled-components";
import Link from "next/link";

const InventoryItemStyles = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export default function InventroyItem({ baseballcard }) {
  const user = useUser();
  return (
    <InventoryItemStyles>
      <Link
        href={{
          pathname: "/updatecard",
          query: {
            id: baseballcard.id,
          },
        }}
      >
        Edit ✏️
      </Link>
      <h4>{baseballcard.firstName}</h4>
      <h4>{baseballcard.lastName}</h4>
    </InventoryItemStyles>
  );
}
