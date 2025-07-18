import { useFetchData } from '../../../hooks/useFetchData';
import AdminAddMovie from './components/AdminAddMovie';
import AdminListMovie from './components/AdminListMovie';

function AdminDashBoard() {
  const { listMovies, setListMovies, fetchMovies } = useFetchData();

  const addMovie = (newMovie) => {
    setListMovies((prev) => [...prev, newMovie]);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Trang Admin</h1>

      <AdminAddMovie addMovie={addMovie} fetchMovies={fetchMovies} />
      <hr className="my-8 border-gray-600" />
      <AdminListMovie
        listMovies={listMovies}
        setListMovies={setListMovies}
        fetchMovies={fetchMovies}
      />
    </div>
  );
}

export default AdminDashBoard;
