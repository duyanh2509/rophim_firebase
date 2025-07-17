export function MovieRegionCard({ movie }) {
  return (
    <div className="flex flex-col justify-center items-center">
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
