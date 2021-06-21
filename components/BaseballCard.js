import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import { useUser } from './User';
import styled from 'styled-components';

const SignInLinkStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default function BaseballCard({ baseballcard }) {
  const user = useUser();
  console.log('bbcardyear', baseballcard.year);
  return (
    <ItemStyles>
      <img
        src={baseballcard?.image1?.image?.publicUrlTransformed}
        alt={baseballcard.firstName}
      />
      <Title>
    
       
        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.brand}</Link>
        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.firstName}</Link>
        <Link href={`/baseballcard/${baseballcard.id}`}>{baseballcard.lastName}</Link>

 
      </Title>
      <PriceTag>{formatMoney(baseballcard.sellingPrice)}</PriceTag>
      <p>{baseballcard.description}</p>
      <div className="buttonList">
        
        {user && <AddToCart id={baseballcard.id} />}
        {!user && (
        <SignInLinkStyles>
          <Link href="/signin">Sign In or Register to Add to Cart</Link>
        </SignInLinkStyles>
      )}
     
        {/* <DeleteBaseballCard id={baseballcard.id}>Delete</DeleteBaseballCard> */}
      </div>
    </ItemStyles>
  );
}
