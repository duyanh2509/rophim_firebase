import { useNavigate } from 'react-router';
import AdminDeleteMovie from './AdminDeleteMovie';

function AdminListMovie({ listMovies, setListMovies, fetchMovies }) {
  const navigate = useNavigate();

  const handleDeleteSuccess = (deletedId) => {
    setListMovies((prev) => prev.filter((movie) => movie.id !== deletedId));
  };

  const handleNavigateToDetail = (id, title) => {
    navigate(`/movies/${id}`, {
      state: { title: title },
    });
  };

  const handleNavigateToUpdate = (id) => {
    navigate(`movies/${id}/update`);
  };

  return (
    <div className="p-6 mt-[75px] text-white">
      <h2 className="text-2xl font-bold mb-4">Danh sách phim</h2>
      {listMovies.length === 0 ? (
        <p>Không có phim nào.</p>
      ) : (
        <table className="w-full text-left border border-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Tiêu đề</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {listMovies.map((movie) => (
              <tr key={movie.id} className="border-t border-gray-700">
                <td className="p-2">{movie.id}</td>
                <td className="p-2">{movie.title}</td>
                <td className="p-2">{movie.slug}</td>
                <td className="p-2">
                  <AdminDeleteMovie
                    movieId={movie.id}
                    onDeleteSuccess={handleDeleteSuccess}
                    fetchMovies={fetchMovies}
                  />
                  <button
                    onClick={() =>
                      handleNavigateToDetail(movie.id, movie.title)
                    }
                    className="ml-2 bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleNavigateToUpdate(movie.id)}
                    className="ml-2 bg-green-600 hover:bg-green-700 py-1 px-2 rounded"
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminListMovie;
