import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

function AdminDeleteMovie({ movieId, onDeleteSuccess, fetchMovies }) {
  const handleDelete = async () => {
    try {
      const movieRef = doc(db, 'movies', movieId);
      await deleteDoc(movieRef);
      alert('Đã xóa phim!');
      onDeleteSuccess(movieId);
      await fetchMovies();
    } catch (err) {
      console.error('Lỗi khi xóa phim:', err);
      alert('Không xóa được phim: ' + err.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
    >
      Xóa
    </button>
  );
}

export default AdminDeleteMovie;
