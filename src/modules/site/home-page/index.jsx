import InputContainer from './components/InputContainer';
import BannerMovies from './components/BannerMovies';
import MovieRegions from './components/MovieRegions';
import ListCategories from './components/ListCategories';
import NewMovie from './components/NewMovies';

const Home = () => {
  return (
    <div className="bg-[#0F111A] min-h-screen">
      <InputContainer />
      <BannerMovies />
      <ListCategories />
      <MovieRegions />
      <NewMovie />
    </div>
  );
};

export default Home;
