import { useEffect, useState } from 'react';
import { Table, Pagination } from '@mantine/core';
import classes from './PeopleDirectory.module.css';
import useHttpRequest from '../hooks/use-http-request';
// import axios from 'axios';

// interface Field {
//   address: string;
//   birthday_date: string;
//   email: string;
//   id: number;
//   name: string;
//   phone_number: string;
// }

// interface Data {
//   count?: number;
//   next?: string | null;
//   previous?: string | null;
//   results: Field[];
// }

function PeopleDirectory() {
  // const [recievedData, setReceivedData] = useState<Data>({ results: [] });
  const [activePage, setActivePage] = useState(1);

  const params = {
    page: activePage,
    limit: 10,
  };

  const { recievedData, fetchData, total } = useHttpRequest(params);

  useEffect(() => {
    fetchData('https://technical-task-api.icapgroupgmbh.com/api/table/');
  }, [activePage]);

  const rows = recievedData?.results.map((field) => (
    <Table.Tr key={field.id}>
      <Table.Td>{field.name}</Table.Td>
      <Table.Td>{field.email}</Table.Td>
      <Table.Td>{field.phone_number}</Table.Td>
      <Table.Td>{field.birthday_date}</Table.Td>
      <Table.Td>{field.address}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className={classes.table}>
        <Table horizontalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>Date of Birthday</Table.Th>
              <Table.Th>Address</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
      <Pagination
        classNames={{ root: classes.root }}
        total={total}
        color="rgba(200, 182, 250, 1)"
        radius="lg"
        value={activePage}
        onChange={setActivePage}
      />
    </>
  );
}

export default PeopleDirectory;
