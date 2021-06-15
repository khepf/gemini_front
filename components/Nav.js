import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  // console.log('user', user)
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/baseballcards">Cards</Link>
      {user && user.role.name !== "Customer" && (<><Link href="/inventory">Inventory</Link></>)}
      {user && (
        <>
          <Link href="/orders">Orders</Link>
          
          
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) =>
                  tally + (cartItem.baseballcard ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
