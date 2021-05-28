import { useRouter } from 'next/dist/client/router';
import InventoryTable from '../../components/InventoryTable';
import PaginationInventory from '../../components/PaginationInventory';

export default function InventoryPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return <div>
    <InventoryTable />
  </div>
}