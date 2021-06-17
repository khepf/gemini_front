import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import InventoryItem from './InventoryItem'

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
      sellingPrice
      inventoryStatus
    }
  }
`;

const FullInventoryStyles = styled.div`
  border: 2px solid rebeccapurple;
`;

export default function FullInventory({ page }) {
    const { data, error, loading } = useQuery(ALL_BASEBALL_CARDS_QUERY, {
      variables: {
        skip: page * perPage - perPage,
        first: perPage,
      },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
      <div>
        <FullInventoryStyles>
          {data.allBaseballCards.map((baseballcard) => (
            <InventoryItem key={baseballcard.id} baseballcard={baseballcard}/>
          ))}
        </FullInventoryStyles>
      </div>
    );
  }