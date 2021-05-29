import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteBaseballCard from './DeleteBaseballCard';
import AddToCart from './AddToCart';

export default function BaseballCard({ baseballcard }) {
  return (
    <ItemStyles>
      <img
        src={baseballcard?.image1?.image?.publicUrlTransformed}
        alt={baseballcard.firstName}
      />
      <Title>
        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.firstName}</Link>
        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.lastName}</Link>
      </Title>
      <PriceTag>{formatMoney(baseballcard.sellingPrice)}</PriceTag>
      <p>{baseballcard.description}</p>
      <div className="buttonList">
        {/* <Link
          href={{
            pathname: '/update',
            query: {
              id: baseballcard.id,
            },
          }}
        >
          Edit ✏️
        </Link> */}
        <AddToCart id={baseballcard.id} />
        {/* <DeleteBaseballCard id={baseballcard.id}>Delete</DeleteBaseballCard> */}
      </div>
    </ItemStyles>
  );
}
