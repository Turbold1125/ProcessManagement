import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import Layout from './Layout/Layout';
import Orders from './Pages/Orders';
import ProcessManagement from './Pages/Inventory';
import OrderDetail from './Pages/OrderDetail';
import ConstantsManager from './Pages/Constants';
import UserProvider from './Context/userContext';
import AdminRoute from './Context/AdminRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />},
      { path: "login", element: <Login /> },
      { path: "orders", element: <Orders /> },
      { path: "inventory", element: <ProcessManagement />},
      { path: "order/:id", element: <OrderDetail />},
      {
        path: "constants",
        element: (
          <AdminRoute>
            <ConstantsManager />
          </AdminRoute>
        ),
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <RouterProvider router={router}/>
  </React.Fragment>
);
