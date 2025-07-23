import { useState } from 'react';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { useNavigate } from 'react-router';

const Login = () => {
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
        localStorage.setItem('userEmail', email);
        if (email.includes('@adminrophim.com')) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (error) {
        alert('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
        setIsSignedIn(false);
        setPassword('');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f1731] backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#121c39] text-white rounded-lg overflow-hidden shadow-xl flex">
        <div
          className="w-1/2 hidden md:block bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dehyvlweg/image/upload/v1753253197/download_muclba.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8 bg-[#1f2a50]">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                className="w-full px-3 py-2 rounded-md bg-[#2c3e75] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full px-3 py-2 rounded-md bg-[#2c3e75] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-yellow-500 transition"
            >
              {isSignedIn ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">Quên mật khẩu?</p>
          <p
            onClick={() => navigate('/sign-up')}
            className="mt-2 text-center text-sm text-yellow-400 hover:underline cursor-pointer"
          >
            Nếu bạn chưa có tài khoản,{' '}
            <span className="font-semibold">đăng ký ngay</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
