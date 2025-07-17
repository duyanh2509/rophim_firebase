import { Route, Routes } from 'react-router';
import './App.css';
import AdminDashBoard from './components/Admin/AdminDashBoard';
import AdminListMovie from './components/Admin/AdminListMovie';
import MovieDetail from './pages/movie-detail';
import InputContainer from './components/user/InputContainer';
import AdminUpdateMovie from './components/Admin/AdminUpdateMovies';
import Login from './pages/login-page/Login';
import SignUp from './pages/login-page/Sign-Up';

const App = () => {
  return (
    <div className="bg-[#0F111A]">
      <Routes>
        <Route path="admin">
          <Route index element={<AdminDashBoard />} />
          <Route path="movies" element={<AdminListMovie />} />
          <Route path="movies/:id/update" element={<AdminUpdateMovie />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="movies/:id" element={<MovieDetail />} />
        <Route path="movies/input" element={<InputContainer />} />
      </Routes>
      <br />
      {/* <div>
        <InputContainer />
        <BannerMovies />
        <MovieRegions />
      </div> */}
    </div>
  );
};

export default App;
