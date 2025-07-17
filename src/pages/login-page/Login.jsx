import { useState } from 'react';
import { useNavigate } from 'react-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

function LoginPage() {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!inputUsername || !inputPassword) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu');
      return;
    }

    try {
      const accountCollectionRef = collection(db, 'accounts');
      const accountQuery = query(
        accountCollectionRef,
        where('username', '==', inputUsername),
      );

      const querySnapshot = await getDocs(accountQuery);

      if (querySnapshot.empty) {
        alert('Tài khoản không tồn tại');
        return;
      }

      const matchedUser = querySnapshot.docs[0].data();
      console.log('11111111111111111s', matchedUser);

      if (matchedUser.role === 'user') {
        navigate('/movies/input');
      }

      if (matchedUser.role === 'admin') {
        navigate('/admin');
      }

      if (matchedUser.password !== inputPassword) {
        alert('Mật khẩu không đúng');
        return;
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };
  console.log('>>>>>>>>>>>>>>>', inputUsername);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Đăng Nhập
        </h2>

        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
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
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Đăng Nhập
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
}

export default LoginPage;
