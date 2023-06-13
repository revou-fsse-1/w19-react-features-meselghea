import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import List from './pages/product/List'
import Edit from './pages/product/Edit'
import Add from './pages/product/Add'

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;



