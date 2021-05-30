import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Router from 'next/router';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;



export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function signOutUser() {
    signout();
    Router.push({
      pathname: `/signin`
    });
  }

  return (
    <button type="button" onClick={signOutUser}>
      Sign Out
    </button>
  );
}
