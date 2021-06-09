import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/Form";
import Router from "next/router";
import DeleteBaseballCard from "./DeleteBaseballCard";

const SINGLE_BASEBALL_CARD_QUERY = gql`
  query SINGLE_BASEBALL_CARD_QUERY($id: ID!) {
    BaseballCard(where: { id: $id }) {
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

const UPDATE_BASEBALL_CARD_MUTATION = gql`
  mutation UPDATE_BASEBALL_CARD_MUTATION(
    $id: ID!
    $firstName: String
    $lastName: String
    $year: Int
    $brand: String
    $card_Number: Int
    $condition: String
    $description: String
    $buyPrice: Int
    $buyDate: String
    $sellingPrice: Int
    $sellingDate: String
    $soldPrice: Int
    $soldDate: String
    $inventoryStatus: String
  ) {
    updateBaseballCard(
      id: $id
      data: {
        firstName: $firstName
        lastName: $lastName
        year: $year
        brand: $brand
        card_Number: $card_Number
        condition: $condition
        description: $description
        buyPrice: $buyPrice
        buyDate: $buyDate
        sellingPrice: $sellingPrice
        sellingDate: $sellingDate
        soldPrice: $soldPrice
        soldDate: $soldDate
        inventoryStatus: $inventoryStatus
      }
    ) {
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

export default function UpdateBaseballCard({ id }) {
  // 1. We need to get the existing baseball card
  const { data, error, loading } = useQuery(SINGLE_BASEBALL_CARD_QUERY, {
    variables: { id },
  });
  // 2. We need to get the mutation to update the baseball card
  const [
    updateBaseballCard,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_BASEBALL_CARD_MUTATION);
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(
    // data?.BaseballCard
    {
      firstName: data?.BaseballCard.firstName ? data.BaseballCard.firstName : "",
      lastName: data?.BaseballCard.lastName ? data.BaseballCard.lastName : "",
      year: data?.BaseballCard.year ? data.BaseballCard.year : "",
      brand: data?.BaseballCard.brand ? data.BaseballCard.brand : "",
      card_Number: data?.BaseballCard.card_Number ? data.BaseballCard.card_Number : "",
      condition: data?.BaseballCard.condition ? data.BaseballCard.condition : "",
      description: data?.BaseballCard.description ? data.BaseballCard.description : "",
      buyPrice: data?.BaseballCard.buyPrice ? data.BaseballCard.buyPrice : 0,
      buyDate: data?.BaseballCard.buyDate ? data.BaseballCard.buyDate : "",
      sellingPrice: data?.BaseballCard.sellingPrice ? data.BaseballCard.sellingPrice : 0,
      sellingDate: data?.BaseballCard.sellingDate ? data.BaseballCard.sellingDate : "",
      soldPrice: data?.BaseballCard.soldPrice ? data.BaseballCard.soldPrice : 0,
      soldDate: data?.BaseballCard.soldDate ? data.BaseballCard.soldDate : "",
      inventoryStatus: data?.BaseballCard.inventoryStatus ? data.BaseballCard.inventoryStatus : ""
    }
  );
  console.log(inputs);
  if (loading) return <p>loading...</p>;
  // 3. We need the form to handle the updates
  return (
    <>
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateBaseballCard({
          variables: {
            id,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            year: inputs.year,
            brand: inputs.brand,
            card_Number: inputs.card_Number,
            condition: inputs.condition,
            description: inputs.description,
            buyPrice: inputs.buyPrice,
            buyDate: inputs.buyDate,
            sellingPrice: inputs.sellingPrice,
            sellingDate: inputs.sellingDate,
            soldPrice: inputs.soldPrice,
            soldDate: inputs.soldDate,
            inventoryStatus: inputs.inventoryStatus,
          },
        }).catch(console.error);
        clearForm();
        Router.push({
          pathname: `/baseballcard/${id}`,
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={inputs.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={inputs.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="year">
          Year
          <input
            type="text"
            id="year"
            name="year"
            placeholder="Year"
            value={inputs.year}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="brand">
          Brand
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Brand"
            value={inputs.brand}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="card_Number">
          Card #
          <input
            type="text"
            id="card_Number"
            name="card_Number"
            placeholder="Card #"
            value={inputs.card_Number}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="condition">
          Condition
          <input
            type="text"
            id="condition"
            name="condition"
            placeholder="Condition"
            value={inputs.condition}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="buyPrice">
          Buy Price
          <input
            type="number"
            id="buyPrice"
            name="buyPrice"
            placeholder="Buy Price"
            value={inputs.buyPrice}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="buyDate">
          Buy Date
          <input
            type="text"
            id="buyDate"
            name="buyDate"
            placeholder="Buy Date"
            value={inputs.buyDate}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="sellingPrice">
          Selling Price
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Selling Price"
            value={inputs.sellingPrice}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="sellingDate">
          Selling Date
          <input
            type="text"
            id="sellingDate"
            name="sellingDate"
            placeholder="Selling Date"
            value={inputs.sellingDate}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="soldPrice">
          Sold Price
          <input
            type="number"
            id="soldPrice"
            name="soldPrice"
            placeholder="Sold Price"
            value={inputs.soldPrice}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="soldDate">
          Sold Date
          <input
            type="text"
            id="soldDate"
            name="soldDate"
            placeholder="Sold Date"
            value={inputs.soldDate}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="inventoryStatus">
          Inventory Status
          <select
            id="inventoryStatus"
            name="inventoryStatus"
            placeholder="Select..."
            value={inputs.inventoryStatus}
            onChange={handleChange}
          >
            <option value="notSelling">Not Selling</option>
            <option value="selling">Selling</option>
            <option value="sold">Sold</option>
          </select>
        </label>
        <button type="submit">Update Baseball Card</button>
      </fieldset>
    </FormStyles>
    <DeleteBaseballCard id={id}>Delete</DeleteBaseballCard>
    </>
  );
}
