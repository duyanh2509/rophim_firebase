import { useNavigate } from 'react-router';

export function NewMovieCard({ movie }) {
  const navigate = useNavigate();
  const handleNavigateToDetail = (id, title) => {
    navigate(`/movies/${id}`, {
      state: { title: title },
    });
  };
  return (
    <div
      onClick={() => handleNavigateToDetail(movie.id, movie.title)}
      className="flex flex-col text-center justify-between gap-3 cursor-pointer"
    >
      <div className="w-full max-w-full max-h-[274px] pb-[150%] h-0 relative rounded-md overflow-hidden bg-[#2F3346] transition-all duration-100 ease-linear">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          src={movie.image}
          alt={movie.title}
        />
      </div>
      <p className="text-sm font-bold text-white font-sans">{movie.title}</p>
      <p className="text-[14px] font-medium text-[#AAAAAA] font-sans">
        {movie.slug}
      </p>
    </div>
  );
}
