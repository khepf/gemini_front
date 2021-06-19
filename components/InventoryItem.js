import { useUser } from "./User";
import styled from "styled-components";
import Link from "next/link";



export default function InventoryItem({ baseballcard }) {
  const user = useUser();
  return (
    
        <div className="row">
            <div className="col">
            <Link
                href={{
                pathname: "/updatecard",
                query: {
                    id: baseballcard.id,
                },
                }}
            >
                Edit ✏️
            </Link>
            </div>
            <div className="col">
            {baseballcard.firstName}
            </div>
            <div className="col">
            {baseballcard.lastName}
            </div>
            <div className="col">
            {baseballcard.year}
            </div>
            <div className="col">
            {baseballcard.brand}
            </div>
            <div className="col">
            {baseballcard.card_Number}
            </div>
            <div className="col">
            {baseballcard.condition}
            </div>
            <div className="col">
            {baseballcard.buyPrice}
            </div>
            <div className="col">
            {baseballcard.buyDate}
            </div>
            <div className="col">
            {baseballcard.sellingPrice}
            </div>
            <div className="col">
            {baseballcard.sellingDate}
            </div>
            <div className="col">
            {baseballcard.soldPrice}
            </div>
            <div className="col">
            {baseballcard.soldDate}
            </div>
        
        </div>

   
  );
}
