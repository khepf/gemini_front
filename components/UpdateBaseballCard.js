import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useFormTemplateHook from "../lib/useFormTemplateHook";
import DisplayError from "./ErrorMessage";
import Router from "next/router";
import DeleteBaseballCard from "./DeleteBaseballCard";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const UpdateFormStyles = styled.form`
  max-width: 800px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: darkBlue;
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: darkBlue;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #add8e6 0%,
        #0000ff 50%,
        #0047ab 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

const ButtonRowStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
  const { inputs, handleChange, clearForm, resetForm } = useFormTemplateHook({
    firstName: data?.BaseballCard.firstName ? data.BaseballCard.firstName : "",
    lastName: data?.BaseballCard.lastName ? data.BaseballCard.lastName : "",
    year: data?.BaseballCard.year ? data.BaseballCard.year : "",
    brand: data?.BaseballCard.brand ? data.BaseballCard.brand : "",
    card_Number: data?.BaseballCard.card_Number
      ? data.BaseballCard.card_Number
      : "",
    condition: data?.BaseballCard.condition ? data.BaseballCard.condition : "",
    description: data?.BaseballCard.description
      ? data.BaseballCard.description
      : "",
    buyPrice: data?.BaseballCard.buyPrice ? data.BaseballCard.buyPrice : 0,
    buyDate: data?.BaseballCard.buyDate ? data.BaseballCard.buyDate : "",
    sellingPrice: data?.BaseballCard.sellingPrice
      ? data.BaseballCard.sellingPrice
      : 0,
    sellingDate: data?.BaseballCard.sellingDate
      ? data.BaseballCard.sellingDate
      : "",
    soldPrice: data?.BaseballCard.soldPrice ? data.BaseballCard.soldPrice : 0,
    soldDate: data?.BaseballCard.soldDate ? data.BaseballCard.soldDate : "",
    inventoryStatus: data?.BaseballCard.inventoryStatus
      ? data.BaseballCard.inventoryStatus
      : "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  async function handleSubmitForm(e) {
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
  }
  if (loading) return <p>loading...</p>;
  // 3. We need the form to handle the updates
  return (
    <>
      <UpdateFormStyles onSubmit={handleSubmit(handleSubmitForm)}>
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
              type="number"
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

          <ButtonRowStyles>
            <button type="submit">Update</button>
            <DeleteBaseballCard id={id}>Delete</DeleteBaseballCard>
          </ButtonRowStyles>
        </fieldset>
      </UpdateFormStyles>
    </>
  );
}
