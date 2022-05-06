import { Outlet } from "react-router-dom";

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './Layout.css';


const Layout = () => {
    return (
        <div className="layout-container">
          <Header/>

          <Outlet/>

          <Footer/>
        </div>
    );
}

export default Layout;