import { useRouter } from 'next/dist/client/router';
import PaginationCards from '../../components/PaginationCards';
import BaseballCards from '../../components/BaseballCards';

export default function BaseballCardsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <PaginationCards page={page || 1} />
      <BaseballCards page={page || 1} />
      <PaginationCards page={page || 1} />
    </div>
  );
}