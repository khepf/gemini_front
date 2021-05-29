import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import Router from 'next/router';

const SINGLE_BASEBALL_CARD_QUERY = gql`
  query SINGLE_BASEBALL_CARD_QUERY($id: ID!) {
    BaseballCard(where: { id: $id }) {
      id
      firstName
      lastName
      description
      sellingPrice
    }
  }
`;

const UPDATE_BASEBALL_CARD_MUTATION = gql`
  mutation UPDATE_BASEBALL_CARD_MUTATION(
    $id: ID!
    $firstName: String
    $lastName: String
    $description: String
    $sellingPrice: Int
  ) {
    updateBaseballCard(
      id: $id
      data: { firstName: $firstName, lastName: $lastName, description: $description, sellingPrice: $sellingPrice }
    ) {
      id
      firstName
      lastName
      description
      sellingPrice
    }
  }
`;

export default function UpdateBaseballCard({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_BASEBALL_CARD_QUERY, {
    variables: { id },
  });
  // 2. We need to get the mutation to update the product
  const [
    updateBaseballCard,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_BASEBALL_CARD_MUTATION);
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.BaseballCard);
  console.log(inputs);
  if (loading) return <p>loading...</p>;
  // 3. We need the form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateBaseballCard({
          variables: {
            id,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            description: inputs.description,
            sellingPrice: inputs.sellingPrice,
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

        <button type="submit">Update Baseball Card</button>
      </fieldset>
    </Form>
  );
}
