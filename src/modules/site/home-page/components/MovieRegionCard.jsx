import { useNavigate } from 'react-router';

export function MovieRegionCard({ movie }) {
  const navigate = useNavigate();
  const handleNavigateToDetail = (id, title) => {
    navigate(`/movies/${id}`, {
      state: { title: title },
    });
  };
  return (
    <div
      onClick={() => handleNavigateToDetail(movie.id, movie.title)}
      className="flex flex-col justify-center items-center cursor-pointer"
    >
      <div className="max-w-[360px] max-h-[202px]">
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={movie.image}
          alt={movie.title}
        />
      </div>
      <p className="h-[48px] px-2 text-sm text-white font-sans flex justify-center items-center text-center leading-[1.4] overflow-hidden">
        {movie.title}
      </p>
    </div>
  );
}
