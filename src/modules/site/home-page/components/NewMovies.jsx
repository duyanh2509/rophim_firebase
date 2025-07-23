import { useFetchData } from '../../../../hooks/useFetchData';
import { NewMovieCard } from './NewMovieCard';

function NewMovie() {
  const { listMovies } = useFetchData();
  const newMovie = listMovies.filter((movie) =>
    movie.type?.includes('New Movie'),
  );
  return (
    <div className="flex flex-col p-5">
      <h2 className="text-[25.2px] font-medium text-white mb-5">
        Phim Điện Ảnh Mới Coóng
      </h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {newMovie.map((item, index) => (
          <NewMovieCard key={index} movie={item} />
        ))}
      </div>
    </div>
  );
}
export default NewMovie;
