import {Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import MainLayout from './Components/Layout/MainLayout';
import HomePage from './Components/Pages/HomePage';
import CategorySlider from './Components/CategorySlider/CategorySlider';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { ToastContainer} from 'react-toastify';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import { useEffect, useState } from 'react';
import CartContextProvider from './context/cartContext';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import jwtDecode from "jwt-decode";
import Cart from './Components/Cart/Cart';
import AllOrders from './Components/AllOrders/AllOrders';
import Wishlist from './Components/Wishlist/Wishlist';
import Categoryproducts from './Components/CategoryProducts/CategoryProducts';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import BrandProduct from './Components/BrandProduct/BrandProduct';
import Products from './Components/Products/Products';
import { AuthProvider } from './context/AuthContext';
import Payment from './Components/Payment/Payment';
import NotFound from './Components/NotFound/NotFound';



function App() {
  function ProtectRoute({children}){

    if(crrUser == null && localStorage.getItem('ahmedToken') == null){
      return <Navigate to={'/login'}/>
    }else{
      return <> 
      { children }
      </>
    }
  };
  const [crrUser, setCrrUser] = useState(null);
    function getUserData(){
    const userData = jwtDecode(localStorage.getItem('ahmedToken'))
    setCrrUser(userData);
    }

    function clearUserData(){
      localStorage.removeItem('ahmedToken');
      setCrrUser(null);
    }

      useEffect(function(){
        if ( localStorage.getItem('ahmedToken') != null && crrUser == null ){
          getUserData();
        }
      },[]);


  let routes = createHashRouter([
    {path:'/',element:<MainLayout crrUser={crrUser} clearUserData={clearUserData}/>,
    children:[
      {index:true,element:<HomePage/>},
      {path:'register',element:<Register/>},
      {path:'login',element:<Login getUserData={getUserData}/>},
      {path:'categories',element:<Categories/>},
      {path:'products',element:<Products/>},
      {path: "categoryproducts/:id", element: <ProtectRoute><Categoryproducts/></ProtectRoute> },
      {path:'product-details/:id',element:<ProtectRoute><ProductDetails/></ProtectRoute>},
      // {path:'brands',element:<Brands/>},
      {path:'brandproducts/:id',element:<ProtectRoute><BrandProduct/></ProtectRoute>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path: "verifycode", element: <VerifyCode /> },
      {path: "resetpassword", element: <ResetPassword /> },
      {path: "cart", element: <ProtectRoute><Cart crrUser={crrUser}/> </ProtectRoute>},
      {path: "allorders", element:<ProtectRoute><AllOrders crrUser={crrUser} /></ProtectRoute>},
      {path: "wishlist", element:<ProtectRoute><Wishlist crrUser={crrUser}/> </ProtectRoute> },
      {path: "payment", element: <ProtectRoute><Payment /></ProtectRoute> },
      { path: '*', element: <NotFound /> }

    ]}
  ])
  return (
    <div style={{'marginTop':'110px'}}>
      <AuthProvider>
        <CartContextProvider>
          <ToastContainer />
          <RouterProvider router={routes}/>
        </CartContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
