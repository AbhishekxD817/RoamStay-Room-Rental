import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/system'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home.jsx'
import AllListingsPage from './pages/listings/AllListingsPage.jsx'
import Wrapper from './components/wrapper/Wrapper.jsx';
import ShowListingPage from './pages/listings/ShowListingPage.jsx';
import EditListingPage from './pages/listings/EditListingPage.jsx';
import CreateListingPage from './pages/listings/CreateListingPage.jsx';
import Auth from './pages/Auth/Auth.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import store from './store/store.js'
import { Provider } from 'react-redux'





const router = createBrowserRouter([
  {
    element: <Wrapper />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/listings", element: <AllListingsPage /> },
      { path: "/listings/create", element: <CreateListingPage /> },
      { path: "/listings/:id", element: <ShowListingPage /> },
      { path: "/listings/:id/edit", element: <EditListingPage /> }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>
  </StrictMode>,
)
