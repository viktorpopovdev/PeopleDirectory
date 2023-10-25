import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import PeopleDirectory from './components/PeopleDirectory';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: 'directory', element: <PeopleDirectory /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
