import { useState } from 'react';
import axios from 'axios';

export interface Field {
  address: string;
  birthday_date: string;
  email: string;
  id: number;
  name: string;
  phone_number: string;
}

interface Data {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Field[];
}

function useHttpRequest(params: { page: number; limit: number }) {
  const { page, limit } = params;
  const [recievedData, setReceivedData] = useState<Data>({ count: limit, results: [] });
  const { count } = recievedData;
  const total = Math.ceil(count / limit);

  async function fetchData(url: string) {
    try {
      const { data, status } = await axios.get(url, {
        headers: {
          Accept: 'application/json',
        },
        params: {
          limit,
          offset: String(page - 1 * limit),
        },
      });

      setReceivedData(data);

      console.log('response status is: ', status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  return {
    recievedData,
    fetchData,
    count,
    total,
  };
}

export default useHttpRequest;
