import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const BaseballCardStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_CARD_QUERY = gql`
  query SINGLE_CARD_QUERY($id: ID!) {
    BaseballCard(where: { id: $id }) {
      firstName
      lastName
      year
      brand
      condition
      sellingPrice
      description
      id
      image1 {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
      image2 {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleBaseballCard({ id }) {
  const { data, loading, error } = useQuery(SINGLE_CARD_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { BaseballCard } = data;
  console.log(BaseballCard);
  return (
    <BaseballCardStyles>
      <Head>
        <title>Gemini | {BaseballCard.firstName}</title>
      </Head>
      <img
        src={BaseballCard.image1?.image.publicUrlTransformed}
        alt={BaseballCard.image1?.altText}
      />
      <img
        src={BaseballCard.image2?.image.publicUrlTransformed}
        alt={BaseballCard.image2?.altText}
      />
      <div className="details">
        <h2>{BaseballCard.firstName}</h2>
        <h2>{BaseballCard.lastName}</h2>
        <h2>{BaseballCard.year}</h2>
        <h2>{BaseballCard.brand}</h2>
        <h2>{BaseballCard.condition}</h2>
        <p>{BaseballCard.description}</p>
      </div>
    </BaseballCardStyles>
  );
}
