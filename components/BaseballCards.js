import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import BaseballCard from './BaseballCard';

export const ALL_BASEBALL_CARDS_QUERY = gql`
  query ALL_BASEBALL_CARDS_QUERY($skip: Int = 0, $first: Int) {
    allBaseballCards(first: $first, skip: $skip) {
      id
      firstName
      lastName
      description
      sellingPrice
      image1 {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const BaseballCardsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function BaseballCards({ page }) {
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
      <BaseballCardsListStyles>
        {data.allBaseballCards.map((baseballcard) => (
          <BaseballCard key={baseballcard.id} baseballcard={baseballcard} />
        ))}
      </BaseballCardsListStyles>
    </div>
  );
}
