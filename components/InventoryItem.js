import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteBaseballCard from './DeleteBaseballCard';
import styled from 'styled-components';

const InventoryItemStyles = styled.div`
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
`;

export default function InventoryItem({ baseballcard }) {
  return (
    <InventoryItemStyles>

        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.firstName}</Link>
        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.lastName}</Link>
  
      <h5>{formatMoney(baseballcard.sellingPrice)}</h5>
      <p>{baseballcard.description}</p>
      <div>
        <Link
          href={{
            pathname: '/update',
            query: {
              id: baseballcard.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteBaseballCard id={baseballcard.id}>Delete</DeleteBaseballCard>
      </div>
    </InventoryItemStyles>
  );
}
