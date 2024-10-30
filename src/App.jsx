import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'materialize-css/dist/css/materialize.min.css';
import { Route, Routes } from 'react-router-dom'


import GuestHeader from './GuestComponent/Header/GuestHeader'


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

import ScrollToTop from './ScrollToTopComponent/ScrollToTop';

function App() {
  const UserRole = localStorage.getItem('UserRole');

  if (UserRole === 'Admin') {
    return (
      <>
        <ScrollToTop />
        <div className='admin-container'>
          <Sidebar className='sidebar' />
          This is Admin
        </div>
      </>
    )
  }
  else if (UserRole === null) {
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
    )
  }
  else if (UserRole === 'User') {
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

                <Route path='/payment/status/:StatusURL' element={<PaymentStatus />} />

                <Route path='/signinsignup' element={<SignInSignUp />} />
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
    )
  }
}

export default App
