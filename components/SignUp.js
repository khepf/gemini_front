import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form,  { FormCover } from './styles/Form';
import useFormTemplateHook from '../lib/useFormTemplateHook';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import Link from 'next/link';
import styled from 'styled-components';



const SignUpButtonStyles = styled.div`
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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useFormTemplateHook({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
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
      <h2>Sign Up For an Account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Head and Sign in!
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <SignUpButtonStyles>
        <Link href="/signin">Sign In</Link>
        <button type="submit">Sign Up!</button>
        <Link href="/passwordreset">Password Reset</Link>
        </SignUpButtonStyles>
      </fieldset>
    </Form>
    </FormCover>
  );
}
