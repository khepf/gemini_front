import InventoryTable from "../components/InventoryTable";
import { useUser } from '../components/User';


export default function InventoryPage() {
  const user = useUser();
  console.log('user', user);
    return (<div>
     {user && (
      <InventoryTable userId={user.id}/>
     )} 
  </div>
  )
}