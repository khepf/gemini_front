import CreateBaseballCardButton from "../components/CreatBaseballCardButton";
import InventoryTable from "../components/InventoryTable";
import { useUser } from '../components/User';


export default function InventoryPage() {
    return (<div>
     {/* {user && user.role.name == "Admin"  && (
       <>
      <div><CreateBaseballCardButton /></div>
      <InventoryTable userId={user.id}/>
      </>
     )}
     {user && user.role.name == "Seller"  && (
       <>
       <div><CreateBaseballCardButton /></div>
      <InventoryTable userId={user.id}/>
      </>
     )}
     {!user && (
       <h5>You do not have access to this page, silly goose.</h5>
     )} */}
     {/* <CreateBaseballCardButton /> */}
     {/* <InventoryTable /> */}
<h4>helllo inventory page</h4>
  </div>
  )
}