import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from "next/router";

const DELETE_BASEBALL_CARD_MUTATION = gql`
  mutation DELETE_BASEBALL_CARD_MUTATION($id: ID!) {
    deleteBaseballCard(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteBaseballCard));
}

export default function DeleteBaseballCard({ id, children }) {
  const [deleteBaseballCard, { loading, error }] = useMutation(
    DELETE_BASEBALL_CARD_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this baseball card?')) {
          deleteBaseballCard().then(() => {
            Router.push({
              pathname: `/inventory`,
            });
          }).catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
