import { useState } from 'react';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { userLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      setIsSignedIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate('/admin');
      } catch (error) {
        alert('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
        setIsSignedIn(false);
        setPassword('');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Đăng Nhập
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isSignedIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer">
          Quên Mật Khẩu
        </p>
        <p
          onClick={() => navigate('/sign-up')}
          className="block mt-2 text-sm text-blue-600 text-center cursor-pointer hover:underline"
        >
          Đăng Ký
        </p>
      </div>
    </div>
  );
};
export default Login;
