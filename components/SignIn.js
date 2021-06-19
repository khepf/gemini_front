import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Form, { FormCover } from "./styles/Form";
import useFormTemplateHook from "../lib/useFormTemplateHook";
import { CURRENT_USER_QUERY } from "./User";
import ErrorMessage from "./ErrorMessage";
import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const SignInButtonStyles = styled.div`
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

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useFormTemplateHook({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refectch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmitForm(e) {
    //e.preventDefault();
    const res = await signin();
    resetForm();
    console.log('res!!!', res);
    if (res.data.authenticateUserWithPassword.item) {
      Router.push({
        pathname: `/baseballcards`,
      });
    }
    
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <FormCover>
      <Form method="POST" onSubmit={handleSubmit(handleSubmitForm)}>
        <h2>Sign In to Your Account</h2>
        <ErrorMessage error={error} />
        <fieldset>
          <label htmlFor="email">
            Email
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Your Email Address"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
            {errors.email && <span>Email is required</span>}
          </label>

          <label htmlFor="password">
            Password
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {errors.password && <span>Password is required</span>}
          </label>
          <SignInButtonStyles>
            {/* <Link href="/signup">Sign Up</Link> */}
            <button type="submit">Sign In!</button>
            <Link href="/passwordreset">Reset Password</Link>
          </SignInButtonStyles>
        </fieldset>
      </Form>
    </FormCover>
  );
}
