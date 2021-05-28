import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { inventoryPerPage } from '../config';
import InventoryItem from './InventoryItem';


export const ALL_BASEBALL_CARDS_QUERY = gql`
  query ALL_BASEBALL_CARDS_QUERY($skip: Int = 0, $first: Int) {
    allBaseballCards(first: $first, skip: $skip) {
      id
      firstName
      lastName
      year
      brand
      card_Number
      condition
      description
      buyPrice
      buyDate
      sellingPrice
      sellingDate
      soldPrice
      soldDate
    }
  }
`;

const InventoryListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function InventoryTable({ page }) {
    const { data, error, loading } = useQuery(ALL_BASEBALL_CARDS_QUERY, {
      variables: {
        skip: page * inventoryPerPage - inventoryPerPage,
        first: inventoryPerPage,
      },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
      <div>
        <InventoryListStyles>
          {data.allBaseballCards.map((baseballcard) => (
            <InventoryItem key={baseballcard.id} baseballcard={baseballcard} />
          ))}
        </InventoryListStyles>
      </div>
    );
  }

