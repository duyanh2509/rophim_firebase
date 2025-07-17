export function BannerMovieCard({ movie, setSelectedMovie }) {
  return (
    <div className="max-w-[63.49px] max-h-[38.95px] mr-[5px]">
      <img
        className="w-full h-full object-fill rounded-[10px]"
        src={movie.image}
        alt={movie.title}
        onClick={() => setSelectedMovie(movie)}
      />
    </div>
  );
}
