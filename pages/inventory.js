import CreateBaseballCardButton from "../components/CreatBaseballCardButton";

import { useUser } from '../components/User';
import PleaseSignIn from "../components/PleaseSignIn";
import FullInventory from "../components/FullInventory";


export default function InventoryPage() {
    const user = useUser();
    console.log('user in inventory', user)
    return (<div>
     {user && user.role.name == "Admin"  && (
       <>
      <div><CreateBaseballCardButton /></div>
      <h4>Hello Admin</h4>
      <FullInventory />
      </>
     )}
     {user && user.role.name == "Seller"  && (
       <>
       <div><CreateBaseballCardButton /></div>
       <h4>Hello Seller</h4>
       <FullInventory />
      </>
     )}
     {!user && (
       <h5>You do not have access to this page, silly goose.</h5>
     )}

  </div>
  )
}