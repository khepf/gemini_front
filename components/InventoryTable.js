import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useUser } from './User';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import { inventoryPerPage } from '../config';
import { useTable, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';


export const ALL_BASEBALL_CARDS_QUERY = gql`
  query ALL_BASEBALL_CARDS_QUERY($currentUserId: ID!) {
    allBaseballCards(where: {user: {id: $currentUserId}}) {
      id
      firstName
      lastName
      year
      brand
      card_Number
      condition
      description
      buyPrice
      buyDate
      sellingPrice
      sellingDate
      soldPrice
      soldDate
      user {
          id
      }
    }
  }
`;



function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    // Render the UI for your table
    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' '
                                                : ' '
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
        </div >
    )
}

function InventoryTable(userId) {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'Edit',
                        accessor: 'id',
                        Cell: row => <Link
                        href={{
                          pathname: '/updatecard',
                          query: {
                            id: row.row.values.id,
                          },
                        }}
                      >
                        Edit ✏️
                      </Link>
                    },
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Year',
                        accessor: 'year',
                    },
                    {
                        Header: 'Brand',
                        accessor: 'brand',
                    },
                    {
                        Header: 'Card #',
                        accessor: 'card_Number',
                    },
                    {
                        Header: 'Condition',
                        accessor: 'condition',
                    },
                    {
                        Header: 'Buy Price',
                        accessor: 'buyPrice',
                        Cell: ({ row }) => formatMoney(Number(row.values.buyPrice))
                    },
                    {
                        Header: 'Buy Date',
                        accessor: 'buyDate',
                    },
                    {
                        Header: 'Selling Price',
                        accessor: 'sellingPrice',
                    },
                    {
                        Header: 'Selling Date',
                        accessor: 'sellingDate',
                    },
                    {
                        Header: 'Sold Price',
                        accessor: 'soldPrice',
                    },
                    {
                        Header: 'Sold Date',
                        accessor: 'soldDate',
                    },
                ],
            },
        ],
        []
    )
    
    const currentUserId = Object.values(userId)[0];
    const { data, error, loading } = useQuery(ALL_BASEBALL_CARDS_QUERY, {
        variables: {
            currentUserId
        }
    });

    if (loading) return 'Loading...';
    if (error) return <DisplayError error={error} />;
    return (
   
    <Table columns={columns} data={data.allBaseballCards} />
    )
}

export default InventoryTable;

