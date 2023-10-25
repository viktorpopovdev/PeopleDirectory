import { useEffect, useState } from 'react';
import { Table, Pagination, Modal, Button, TextInput, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './PeopleDirectory.module.css';
import useHttpRequest from '../hooks/use-http-request';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { useForm } from '@mantine/form';
import { Field } from '../hooks/use-http-request';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/User';

function PeopleDirectory() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const params = {
    page: activePage,
    limit: 10,
  };
  const [opened, { open, close }] = useDisclosure(false);

  const { recievedData, fetchData, total } = useHttpRequest(params);

  const form = useForm({
    initialValues: {
      id: 0,
      name: '',
      email: '',
      phone_number: '',
      birthday_date: '',
      address: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const openEdit = (field: Field) => {
    form.setValues(field);
    open();
  };

  const submitEditRow = async (values: Field) => {
    try {
      const { status } = await axios.patch(`https://technical-task-api.icapgroupgmbh.com/api/table/${values.id}/`, {
        ...values,
        id: undefined,
      });

      if (status === 200) {
        fetchData('https://technical-task-api.icapgroupgmbh.com/api/table/');
        close();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

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
      <Table.Td>
        <Button
          onClick={() => {
            openEdit(field);
          }}
        >
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
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
      <Modal opened={opened} onClose={close} title="Edit row">
        <form onSubmit={form.onSubmit(submitEditRow)}>
          <TextInput label="Name" placeholder="name" {...form.getInputProps('name')} />
          <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
          <TextInput label="Phone Number" placeholder="number" {...form.getInputProps('phone_number')} />
          <TextInput label="Date of Birthday" {...form.getInputProps('birthday_date')} />
          <TextInput label="Address" placeholder="address" {...form.getInputProps('address')} />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default PeopleDirectory;
