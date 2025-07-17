import { useEffect, useState } from 'react';
import { useFetchData } from '../../utilities/useFetchData';
import { BannerMovieCard } from './BannerMovieCard';
import BannerMovieGenres from './BannerMovieGenres';

function BannerMovies() {
  const { listBanners } = useFetchData();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (listBanners.length > 0) {
      setSelectedMovie(listBanners[0]);
    }
  }, [listBanners]);

  if (!selectedMovie) return null;

  return (
    <section
      className="relative h-[660px]"
      style={{ backgroundImage: `url(${selectedMovie.image})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#535D8E] via-[#535D8E80] to-transparent opacity-50 z-2"></div>
      <div className="flex flex-col max-w-[600px] px-[30px] pb-[60px] pt-0 justify-between absolute bottom-0 left-0 z-3">
        <div className="w-full">
          <img
            className="w-full block"
            src={selectedMovie.imgTitle}
            alt={selectedMovie.slug}
          />
        </div>
        <div className="text-[1.1em] leading-[1.5] font-light mb-4">
          <a className="text-[#ffd875] text-[15.4px] font-sans">
            {selectedMovie.slug}
          </a>
        </div>
        <div className="flex items-center justify-start flex-wrap gap-[.6em] mb-[0.75em]">
          <span className="bg-transparent border border-[#f0d25c] rounded-[0.33rem] font-medium cursor-default leading-[24px] text-[12px] px-[0.4rem] py-0 shrink-0 inline-flex items-center text-[#f0d25c]">
            IMDb <span className="text-white"> {selectedMovie.imdb}</span>
          </span>
          <div className="px-[0.4rem] py-0 rounded-[0.33rem] h-[26px] text-[12px] font-bold flex items-center justify-center text-black bg-[linear-gradient(220deg,_#FFD875,_#FFF)]">
            <span>{selectedMovie.quality}</span>
          </div>
          <div className="bg-white text-black font-medium flex overflow-hidden cursor-default leading-[26px] px-2 py-0 shrink-0 rounded-[0.33rem] items-center text-[12px] font-sans">
            <span>{selectedMovie.year}</span>
          </div>
          <div className="bg-white/5 h-[26px] p-[0.4rem] text-white inline-flex border border-white rounded-[0.33rem] items-center text-[12px]">
            <span>{selectedMovie.time}</span>
          </div>
        </div>
        <div className="flex items-center justify-start flex-wrap gap-[.6rem] mb-[0.75rem] text-white text-xs">
          {selectedMovie.genre?.map((item, index) => (
            <BannerMovieGenres key={index} gerne={item} />
          ))}
        </div>
        <p className="text-[14px] leading-[1.6] text-white font-normal mb-8 font-sans [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">
          {selectedMovie.description}
        </p>
      </div>
      <div className="flex absolute right-0 pt-0 px-[30px] pb-[60px] bottom-0 z-3">
        {listBanners.map((movie) => (
          <BannerMovieCard
            key={movie.id}
            movie={movie}
            setSelectedMovie={setSelectedMovie}
          />
        ))}
      </div>
    </section>
  );
}

export default BannerMovies;
