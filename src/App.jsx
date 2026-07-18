import './App.css'
import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './components/core/Auth/PrivateRoute'
import Home from "../src/pages/Home"
import Navbar from './components/common/Navbar'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetFotgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/Settings'
import EnrolledCourse from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart'
import AddCourse from './components/core/Dashboard/AddCourse/Index'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse'
import Catalog from './pages/Catalog'
import { ACCOUNT_TYPE } from './utils/contant'
import { useSelector } from 'react-redux'
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'



function App() {

  const { user } = useSelector((state) => state.auth)

  return (
    <div className="w-screen min-h-screen bg-[#000814] font-inter flex flex-col" >
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />}></Route>
        <Route path='catalog/:catalogName' element={<Catalog />}></Route>
        <Route path='/course/:courseId' element={<CourseDetails />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ResetPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route
          element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>}
        >
          <Route path='dashboard/my-profile' element={<MyProfile />} />
          <Route path='dashboard/Settings' element={<Settings />} />
          <Route path='dashboard/cart' element={<Cart />} />
          <Route path='dashboard/enrolled-courses' element={<EnrolledCourse />} />


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='dashboard/cart' element={<Cart />} />
                <Route path='dashboard/enrolled-courses' element={<EnrolledCourse />} />
              </>
            )
          }


          <Route path='dashboard/add-course' element={<AddCourse />} />
          <Route path='dashboard/my-courses' element={<MyCourses />} />
          <Route path='dashboard/edit-course/:courseId' element={<EditCourse />} />
       
        </Route>

        <Route
          path='view-course/:courseId'
          element={<ViewCourse />}
        >

          <Route
            path='Section/:SectionId/SubSection/:SubSectionId'
            element={<VideoDetails />}
          />

        </Route>

        <Route path='*' element={<Error />} />
      </Routes>
    </div >
  )
}

export default App
