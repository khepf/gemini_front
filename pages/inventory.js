import InventoryTable from "../components/InventoryTable";
import { useUser } from '../components/User';


export default function InventoryPage() {
  const user = useUser();
  console.log('user', user);
    return (<div>
     {user && user.role.name == "Admin"  && (
      <InventoryTable userId={user.id}/>
     )}
     {user && user.role.name == "Seller"  && (
      <InventoryTable userId={user.id}/>
     )}
     {!user && (
       <h5>You do not have access to this page, silly goose.</h5>
     )}

  </div>
  )
}