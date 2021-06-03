import UpdateBaseballCard from '../components/UpdateBaseballCard';

export default function UpdateCardPage({ query }) {
  console.log(query);
  return (
    <div>
      <UpdateBaseballCard id={query.id} />
    </div>
  );
}
