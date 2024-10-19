import Sidebar from './SideBar/UserSideBar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'materialize-css/dist/css/materialize.min.css';
import { Route, Routes } from 'react-router-dom'

import Header from './HeaderFooter/Header'
import Footer from './HeaderFooter/Footer'

import HomeContent from './Home/HomeContent'
import ContactContent from './Contact/ContactContent'

import BookingStoreContent from './Booking/BookingStoreContent'
import BookingStoreDetailContent from './Booking/BookingStoreDetailContent'
import BookingPodContent from './Booking/BookingPodContent'
import BookingPodDetailContent from './Booking/BookingPodDetailContent'
import PaymentContent from './Payment/PaymentContent'

import AboutContent from './About/AboutContent'

import UserInformation from './UserControlContent/UserInformation'
import UserAccount from './UserControlContent/UserAccount'
import UserHistoryBooking from './UserControlContent/UserHistoryBooking'

import SignInSignUp from './SignInSignUp/SignInSignUp'

function App() {
  return (
    <>
      <div className='user-container' >
        <Sidebar className='sidebar' />
        <div className='user-content' >
          <Header />
          <div className='user-content-body'>
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

export default App
