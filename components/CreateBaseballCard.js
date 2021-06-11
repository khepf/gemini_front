import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import useFormTemplateHook from "../lib/useFormTemplateHook";
import DisplayError from "./ErrorMessage";
import { ALL_BASEBALL_CARDS_QUERY } from "./BaseballCards";
import FormStyles from "./styles/Form";
import { useForm } from "react-hook-form";

const CREATE_BASEBALL_CARD_MUTATION = gql`
  mutation CREATE_BASEBALL_CARD_MUTATION(
    # Which variables are getting passed in? And What types are they
    $firstName: String!
    $lastName: String!
    $brand: String!
    $card_Number: Int!
    $year: Int!
    $description: String!
    $condition: String!
    $sellingPrice: Int!
    $image1: Upload
    $image2: Upload
  ) {
    createBaseballCard(
      data: {
        firstName: $firstName
        lastName: $lastName
        brand: $brand
        year: $year
        condition: $condition
        card_Number: $card_Number
        description: $description
        sellingPrice: $sellingPrice
        image1: { create: { image: $image1, altText: $firstName } }
        image2: { create: { image: $image2, altText: $lastName } }
      }
    ) {
      id
      sellingPrice
      description
      firstName
      lastName
      brand
      year
      condition
      card_Number
    }
  }
`;

export default function CreateBaseballCard() {
  const { inputs, handleChange, clearForm, resetForm } = useFormTemplateHook({
    image1: "",
    image2: "",
    firstName: "",
    lastName: "",
    sellingPrice: "",
    description: "",
    brand: "",
    year: "",
    condition: "",
    card_Number: "",
  });
  const [createBaseballCard, { loading, error, data }] = useMutation(
    CREATE_BASEBALL_CARD_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_BASEBALL_CARDS_QUERY }],
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function handleSubmitForm(e) {
    // e.preventDefault(); // stop the form from submitting
    const res = await createBaseballCard().catch(console.error);
    clearForm();
    Router.push({
      pathname: `/baseballcard/${res.data.createBaseballCard.id}`,
    });
  }
  if (loading) return <p>loading...</p>;
  return (
    <>
      <FormStyles
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <DisplayError error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="image1">
            Front Image
            <input
              required
              type="file"
              id="image1"
              name="image1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image2">
            Back Image
            <input
              required
              type="file"
              id="image2"
              name="image2"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="firstName">
            First Name
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={inputs.firstName}
              onChange={handleChange}
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
            />
          </label>
          <label htmlFor="card_Number">
            Card Number
            <input
              type="number"
              id="card_Number"
              name="card_Number"
              placeholder="Card Number"
              value={inputs.card_Number}
              onChange={handleChange}
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
            />
          </label>
          <label htmlFor="sellingPrice">
            Selling Price
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="sellingPrice"
              value={inputs.sellingPrice}
              onChange={handleChange}
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

          <button type="submit">+ Save Baseball Card</button>
        </fieldset>
      </FormStyles>
    </>
  );
}
