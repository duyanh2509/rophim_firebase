import './App.css';
import { Route, Routes } from 'react-router';
import PrivateRouter from './components/common/PrivateRouter';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import AdminDashBoardPage from './pages/admin/admin-dashboard';
import AdminUpdatePage from './pages/admin/admin-update';
import MovieDetailPage from './pages/site/movie-detail';
import HomePage from './pages/site/home-page';
import ProfilePage from './pages/profile-page';

const App = () => {
  return (
    <div className="bg-[#0F111A] min-h-screen">
      <Routes>
        <Route
          path="admin"
          element={
            <PrivateRouter>
              <AdminDashBoardPage />
            </PrivateRouter>
          }
        />
        <Route
          path="admin/movies/:id/update"
          element={
            <PrivateRouter>
              <AdminUpdatePage />
            </PrivateRouter>
          }
        />

        <Route path="login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="movies/:id" element={<MovieDetailPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
