import { useEffect, useContext } from 'react';
import { UserAuth } from './Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'materialize-css/dist/css/materialize.min.css';
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './ScrollToTopComponent/ScrollToTop';

// Guest
import GuestHeader from './GuestComponent/Header/GuestHeader'

// User
import Sidebar from './UserComponent/SideBar/UserSideBar'
import Header from './UserComponent/HeaderFooter/Header'
import Footer from './UserComponent/HeaderFooter/Footer'
import HomeContent from './UserComponent/Home/HomeContent'
import ContactContent from './UserComponent/Contact/ContactContent'
import BookingStoreContent from './UserComponent/Booking/BookingStoreContent'
import BookingStoreDetailContent from './UserComponent/Booking/BookingStoreDetailContent'
import BookingPodContent from './UserComponent/Booking/BookingPodContent'
import BookingPodDetailContent from './UserComponent/Booking/BookingPodDetailContent'
import AboutContent from './UserComponent/About/AboutContent'
import UserInformation from './UserComponent/UserControlContent/UserInformation'
import UserBooking from './UserComponent/UserControlContent/UserBooking'
import UserBookingDetail from './UserComponent/UserControlContent/UserBookingDetail'
import PaymentStatus from './UserComponent/Payment/PaymentStatus'
import SignInSignUp from './UserComponent/SignInSignUp/SignInSignUp'

// Staff
import StaffSidebar from "./Staff/Sidebar/Sidebar";
import StaffHeader from "./Staff/HeadFootComponent/Header";
import StaffHome from "./Staff/HomeComponent/Home";
import StaffPOD from "./Staff/PODComponent/PODManage";
import StaffOrder from "./Staff/Order/Order";
import StaffReport from "./Staff/ReportComponent/ReportManage";
import Staff from "./Staff/UserComponent/Staff";
import StaffCustomer from "./Staff/UserComponent/Customer";
import StaffOrderHistory from "./Staff/Order/OrderHistory";
import StaffProduct from "./Staff/ProductComponent/Product";
import StaffOrderProduct from "./Staff/ProductComponent/OrderProduct";

// Admin
import AdminHome from "./AdminComponent/AdminHome/Home.jsx";
import AdminPOD from "./AdminComponent/ManagePODComponent/POD.jsx";
import AdminSidebar from "./AdminComponent/AdminBar/Sidebar.jsx";
import AdminHeader from "./AdminComponent/HeadFootComponent/Header.jsx";
import AdminReport from "./AdminComponent/ManageReportComponent/ReportManage.jsx";
import AdminStore from "./AdminComponent/StoreManage/Store.jsx";
import AdminAddStore from "./AdminComponent/StoreManage/AddStore.jsx";
import AdminStaff from "./AdminComponent/ManageUserComponent/Staff.jsx";
// import Manager from "../AdminComponent/ManageUserComponent/Manager.jsx";
import AdminCustomer from "./AdminComponent/ManageUserComponent/Customer.jsx";
import AdminAddPOD from "./AdminComponent/ManagePODComponent/AddPOD.jsx";
import AdminAddStaff from "./AdminComponent/ManageUserComponent/AddStaff.jsx";
import AdminProduct from "./AdminComponent/ProductComponent/Product.jsx";
// import Order from "../AdminComponent/Order/Order.jsx";
import AdminOrderHistory from "./AdminComponent/Order/OrderHistory.jsx";
import AdminAddProduct from "./AdminComponent/ProductComponent/AddProduct.jsx";

function App() {
  const UserRole = localStorage.getItem('UserRole');

  const { id, token, role, isLogIn } = UserAuth();

  console.log('id: ', id)
  console.log('token: ', token)
  console.log('role: ', role)
  console.log('isLogIn: ', isLogIn)

  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/')
  // }, [])

  if (role === null) {
    return (
      <>
        <ScrollToTop />
        <div>
          <GuestHeader />
          <div>
            <Routes>
              <Route path='/' element={<HomeContent />} />
              <Route path='/about' element={<AboutContent />} />

              <Route path='/booking/store' element={<BookingStoreContent />} />
              <Route path='/booking/store/:Id' element={<BookingStoreDetailContent />} />
              <Route path='/booking/pod' element={<BookingPodContent />} />
              <Route path='/booking/pod/:Id' element={<BookingPodDetailContent />} />

              <Route path='/contact' element={<ContactContent />} />

              <Route path='/signinsignup' element={<SignInSignUp />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </>
    );
  }
  else if (role === 'User') {
    return (
      <>
        <div className='user-container'>
          <Sidebar className='sidebar' />
          <ScrollToTop />
          <div className='user-content' >
            <Header />
            <div className='user-content-body'>
              <Routes>
                <Route path='/' element={<HomeContent />} />
                <Route path='/about' element={<AboutContent />} />

                <Route path='/booking/store' element={<BookingStoreContent />} />
                <Route path='/booking/store/:Id' element={<BookingStoreDetailContent />} />
                <Route path='/booking/pod' element={<BookingPodContent />} />
                <Route path='/booking/pod/:Id' element={<BookingPodDetailContent />} />

                <Route path='/contact' element={<ContactContent />} />


                <Route path='/user/information' element={<UserInformation />} />
                <Route path='/user/booking' element={<UserBooking />} />
                <Route path='/user/booking/:Id' element={<UserBookingDetail />} />

                <Route path='/paymentstatus/?' element={<PaymentStatus />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </div>

        {/* <Header />
      <Routes>
        <Route path='/' element={<HomeContent />} />
        <Route path='/about' element={<AboutContent />} />

        <Route path='/booking/store' element={<BookingStoreContent />} />
        <Route path='/booking/store/:Id' element={<BookingStoreDetailContent />} />
        <Route path='/booking/store/:Id/pod' element={<BookingPodContent />} />
        <Route path='/booking/store/:Id/pod/:Id' element={<BookingPodDetailContent />} />
        <Route path='/booking/store/:Id/pod/:Id/payment' element={<PaymentContent />} />

        <Route path='/contact' element={<ContactContent />} />


        <Route path='/user/information' element={<UserInformation />} />
        <Route path='/user/account' element={<UserAccount />} />
        <Route path='/user/bookinghistory' element={<UserHistoryBooking />} />

        <Route path='/signinsignup' element={<SignInSignUp />} />
      </Routes>
      <Footer /> */}
      </>
    );
  }
  else if (role === 'Staff') {
    return (
      <>
        <div className="main-container">
          <StaffSidebar className="sidebar" />
          <div className="main-content">
            <StaffHeader />
            <div className="main-content-body">
              <Routes>
                {/* <Route path="/" element={<Home />}></Route>
              <Route path="/pod" element={<POD />}></Route>
              <Route path='/order' element={<Order />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path='/store' element={<Store />}></Route>
              <Route path='/staff' element={<Staff />}></Route> */}
                {/*import staff */}
                <Route path="/" element={<StaffHome />}></Route>
                <Route path="/pod" element={<StaffPOD />}></Route>
                <Route path="/order" element={<StaffOrder />}></Route>
                <Route path="/history" element={<StaffOrderHistory />}></Route>
                <Route path="/report" element={<StaffReport />}></Route>
                <Route path="/staff" element={<Staff />}></Route>
                <Route path="/customer" element={<StaffCustomer />}></Route>
                <Route path="/product" element={<StaffProduct />}></Route>
                <Route path="/booking-order" element={<StaffOrderProduct />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  }
  else if (role === 'Admin') {
    return (
      <div className="admin-container">
        <AdminSidebar className="sidebar" /> {/* Giữ nguyên Sidebar */}
        <div className="admin-content">
          <AdminHeader />
          <div className="admin-content-body">
            <Routes>
              <Route path="/" element={<AdminHome />}></Route>
              <Route path="/pod" element={<AdminPOD />}></Route>
              {/* <Route path="/user" element={<User />}></Route> */}
              <Route path="/report" element={<AdminReport />}></Route>
              <Route path="/store" element={<AdminStore />}></Route>
              <Route path="/addstore" element={<AdminAddStore />}></Route>
              <Route path="/staff" element={<AdminStaff />}></Route>
              {/* <Route path="/manager" element={<Manager />}></Route> */}
              <Route path="/customer" element={<AdminCustomer />}></Route>
              <Route path="/addpod" element={<AdminAddPOD />}></Route>
              <Route path="/addstaff" element={<AdminAddStaff />}></Route>
              <Route path="/product" element={<AdminProduct />}></Route>
              <Route path="/history" element={<AdminOrderHistory />}></Route>
              {/* <Route path="/order" element={<Order />}></Route> */}
              <Route path="/addproduct" element={<AdminAddProduct />}></Route>
              {/* <Route path="/booking-order" element={<OrderProduct />}></Route> */}
            </Routes>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <>
        <div>Chức vụ không có sẵn.</div>
      </>
    );
  }
}

export default App
