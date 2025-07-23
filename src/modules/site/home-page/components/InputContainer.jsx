import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFetchData } from '../../../../hooks/useFetchData';
import { useAuth } from '../../../../contexts/AuthContext';
import { doSignOut } from '../../../../firebase/auth';

function InputContainer() {
  const { listAccounts, listMovies } = useFetchData();
  const { user, fetchUser } = useFetchData();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [currentUser]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMovies([]);
    } else {
      const results = listMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
      );
      setFilteredMovies(results);
    }
  }, [searchTerm, listMovies]);

  const handleLogout = () => {
    doSignOut();
    navigate('/');
  };

  const handleNavigateToDetail = (id, title) => {
    navigate(`/movies/${id}`, {
      state: { title: title },
    });
  };

  return (
    <header className="fixed top-0 left-0 z-10 flex flex-wrap gap-1 items-center justify-center bg-[#0F111A] w-full p-4">
      <div className="w-[120px] shrink-0">
        <a href="/">
          <img
            className="w-full"
            src="https://res.cloudinary.com/dehyvlweg/image/upload/v1752458789/ro-phim-logo_e3foeo.svg"
            alt="Rổ Phim"
          />
        </a>
      </div>

      <div className="flex-1 relative max-w-[368px] h-[44.8px]">
        <input
          className="w-full h-full bg-white/10 border-0 rounded-[5px] text-amber-50 px-3"
          type="text"
          placeholder="Tìm kiếm phim, diễn viên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredMovies.length > 0 && (
          <div className="absolute w-full bg-[#1A1C2B] border border-gray-700 mt-1 rounded-lg z-50 max-h-[400px] overflow-y-auto">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleNavigateToDetail(movie.id, movie.title)}
                className="flex items-center gap-3 p-3 hover:bg-[#272a40] cursor-pointer transition"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded-md"
                />
                <div className="text-white">
                  <h4 className="text-sm font-semibold line-clamp-1">
                    {movie.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {movie.year} • {movie.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <nav
        style={{ flex: '2 1 400px' }}
        className="flex flex-wrap justify-center gap-2"
      >
        {[
          'Chủ Đề',
          'Thể Loại',
          'Phim Lẻ',
          'Xem Chung',
          'Quốc Gia',
          'Diễn Viên',
          'Lịch Chiếu',
        ].map((item, idx) => (
          <a
            key={idx}
            className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
            href="#"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex px-5 py-0 items-center gap-4">
        <div className="flex flex-col border-r border-r-white px-5 py-0">
          <a className="text-[14px] font-sans text-white" href="#">
            Tải Ứng Dụng
          </a>
          <a className="text-[14px] font-sans text-white" href="#">
            RoPhim
          </a>
        </div>

        <div className="flex items-center border rounded-[13px] w-[125px] h-[40.58px] justify-center bg-amber-50 ml-4">
          <a className="text-[14px] font-sans font-bold text-[#333]" href="#">
            Thành viên
          </a>
        </div>

        {currentUser && user?.role === 'admin' && (
          <div className="flex items-center border rounded-[13px] w-[125px] h-[40.58px] justify-center bg-amber-50 ml-4">
            <a
              className="text-[14px] font-sans font-bold text-[#333]"
              href="/admin"
            >
              Quản lý
            </a>
          </div>
        )}

        {currentUser ? (
          <div className="flex items-center gap-2 text-white text-sm font-medium px-3">
            <a href="/profile">👋 {user?.name}</a>
            <button
              onClick={handleLogout}
              className="text-white text-[14px] px-4 py-2 border border-white rounded hover:bg-white hover:text-[#0F111A] transition"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-white text-[14px] px-4 py-2 border border-white rounded hover:bg-white hover:text-[#0F111A] transition"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
}

export default InputContainer;
