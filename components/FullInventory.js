import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { inventoryPerPage } from "../config";
import InventoryItem from "./InventoryItem";

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
      inventoryStatus
    }
  }
`;

const FullInventoryStyles = styled.section`
  border: 2px solid rebeccapurple;
  border-collapse:separate; 
  border-spacing: 0 1em;

  display: table;
  width: 100%;
  > * {
    display: table-row;
  }
  .col {
    display: table-cell;
    
  }
`;

export default function FullInventory({ page }) {
  const { data, error, loading } = useQuery(ALL_BASEBALL_CARDS_QUERY, {
    variables: {
      skip: page * inventoryPerPage - inventoryPerPage,
      first: inventoryPerPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <FullInventoryStyles>
      <header>
        <div className="col"></div>
        <div className="col">First Name</div>
        <div className="col">Last Name</div>
        <div className="col">Year</div>
        <div className="col">Brand</div>
        <div className="col">Card #</div>
        <div className="col">Condition</div>
        <div className="col">Buy Price</div>
        <div className="col">Buy Date</div>
        <div className="col">Selling Price</div>
        <div className="col">Selling Date</div>
        <div className="col">Sold Price</div>
        <div className="col">Sold Date</div>
      </header>
      {data.allBaseballCards.map((baseballcard) => (
            <InventoryItem key={baseballcard.id} baseballcard={baseballcard}/>
          ))}
    </FullInventoryStyles>
  );
}
