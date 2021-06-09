import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form, { FormCover } from './styles/Form';
import useFormTemplateHook from '../lib/useFormTemplateHook';
import Error from './ErrorMessage';
import Link from 'next/link';
import styled from 'styled-components';

const PasswordResetButtonStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 30px;
    margin-right: 30px;
  }
  a {
    color: gray;
  }
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useFormTemplateHook({
    email: '',
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refectch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <FormCover>
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <PasswordResetButtonStyles>
        {/* <Link href="/signup">Sign Up</Link> */}
        <button type="submit">Password Reset!</button>
        <Link href="/signin">Sign In</Link>
        </PasswordResetButtonStyles>
      </fieldset>
    </Form>
    </FormCover>
  );
}
