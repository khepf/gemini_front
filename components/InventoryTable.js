import { useMemo } from "react";
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useTable, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { inventoryPerPage } from '../config';

export const ALL_BASEBALL_CARDS_QUERY = gql`
  query ALL_BASEBALL_CARDS_QUERY($skip: Int = 0, $first: Int) {
    allBaseballCards(first: $first, skip: $skip) {
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
    console.log('rows', rows);
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

function InventoryTable({page}) {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
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

    const { data, error, loading } = useQuery(ALL_BASEBALL_CARDS_QUERY, {
        variables: {
          skip: page * inventoryPerPage - inventoryPerPage,
          first: inventoryPerPage,
        },
      });
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    console.log(JSON.stringify(data));


    return (
        <Table columns={columns} data={data.allBaseballCards} />
    )
}

export default InventoryTable;