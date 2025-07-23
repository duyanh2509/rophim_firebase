import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFetchData } from '../../../../hooks/useFetchData';

function AdminHeader() {
  const navigate = useNavigate();
  const { listAccounts, listMovies } = useFetchData();
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail && listAccounts.length > 0) {
      const user = listAccounts.find((acc) => acc.email === savedEmail);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [listAccounts]);

  useEffect(() => {
    if (search === '') {
      setFilteredMovies([]);
    } else {
      const results = listMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(search.toLowerCase()),
      );
      setFilteredMovies(results);
    }
  }, [search, listMovies]);

  const handleNavigateToUpdate = (id) => {
    navigate(`/admin/movies/${id}/update`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="w-full flex items-center justify-between gap-5 px-5 py-3 bg-[#0F111A] shadow-md relative z-50">
      <div className="w-1/4">
        <img
          src="https://res.cloudinary.com/dehyvlweg/image/upload/v1752458752/logo_xnxtw7.svg"
          alt="Logo"
          className="w-full max-w-[120px] object-contain"
        />
      </div>

      <div className="relative w-2/4">
        <input
          type="text"
          placeholder="Tìm kiếm phim để chỉnh sửa"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-white bg-transparent placeholder:text-white focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.length > 0 && filteredMovies.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleNavigateToUpdate(movie.id)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold line-clamp-1">
                    {movie.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {movie.year} • {movie.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center border rounded-[13px] w-[125px] h-[40.58px] justify-center bg-amber-50 ml-4">
        <a className="text-[14px] font-sans font-bold text-[#333]" href="/">
          Trang Chủ
        </a>
      </div>

      <div className="w-1/4 flex justify-end items-center gap-4">
        <span className="text-sm font-semibold text-white">
          {currentUser?.name || currentUser?.email}
        </span>
        <button
          onClick={handleLogout}
          className="text-white text-[14px] px-4 py-2 border border-white rounded hover:bg-white hover:text-[#0F111A] transition"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
