import { useFetchData } from '../../../../hooks/useFetchData';
import { MovieRegionCard } from './MovieRegionCard';

function MovieRegions() {
  const { listMovies } = useFetchData();
  const hanQuocMovies = listMovies.filter((movie) =>
    movie.region?.includes('Hàn Quốc'),
  );
  const trungQuocMovies = listMovies.filter((movie) =>
    movie.region?.includes('Trung Quốc'),
  );
  const usUkMovies = listMovies.filter((movie) =>
    movie.region?.includes('us-uk'),
  );

  return (
    <div className="w-full p-5 flex flex-col gap-4">
      <section className="flex p-8 pb-8 gap-4 justify-center items-center">
        <div className="flex flex-col justify-evenly max-w-[184px] max-h-[111.89px] gap-6">
          <h2
            className="text-[24px] font-bold !bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(235deg, white 30%, #674196 130%)',
            }}
          >
            Phim Hàn Quốc
          </h2>
          <a className="text-sm text-white no-underline font-sans">
            Xem Toàn Bộ
          </a>
        </div>
        <div className="grid grid-cols-5 justify-center gap-[10px]">
          {hanQuocMovies.map((movie) => (
            <MovieRegionCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="flex p-[32px] pb-[32px] gap-4 justify-center items-center">
        <div className="flex flex-col justify-evenly max-w-[184px] max-h-[111.89px] gap-[22px]">
          <h2
            className="text-[24px] font-bold !bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(235deg, white 30%, #674196 130%)',
            }}
          >
            Phim Trung Quốc
          </h2>
          <a className="text-sm text-white no-underline font-sans">
            Xem Toàn Bộ
          </a>
        </div>
        <div className="grid grid-cols-5 justify-center gap-[10px]">
          {trungQuocMovies.map((movie) => (
            <MovieRegionCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="flex p-[32px] pb-[32px] gap-4 justify-center items-center">
        <div className="flex flex-col justify-evenly max-w-[184px] max-h-[111.89px] gap-[22px]">
          <h2
            className="text-[24px] font-bold !bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(235deg, white 30%, #674196 130%)',
            }}
          >
            Phim US-UK
          </h2>
          <a className="text-sm text-white no-underline font-sans">
            Xem Toàn Bộ
          </a>
        </div>
        <div className="grid grid-cols-5 justify-center gap-[10px]">
          {usUkMovies.map((movie) => (
            <MovieRegionCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieRegions;
