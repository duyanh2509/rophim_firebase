import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { convertToYoutubeEmbedUrl } from '../../../utilities/ConvertLinkYoutube';
import { useAuth } from '../../../contexts/AuthContext';
import InputContainer from '../home-page/components/InputContainer';
import { useFetchData } from '../../../hooks/useFetchData';
import { Comments } from '../home-page/components/comments';

function MovieDetail() {
  const { id } = useParams();
  const location = useLocation();
  const loadingTitle = location.state?.title;
  const { currentUser } = useAuth();
  const { listComments, fetchComments } = useFetchData();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActors, setShowActors] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [actors, setActors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    fetchComments(id);
  }, []);
  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const docRef = doc(db, 'movies', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const movieData = docSnap.data();
          setMovie(movieData);

          const actorsData = movieData.actor.map((actorName) => ({
            name: actorName,
          }));
          setActors(actorsData);

          const querySnapshot = await getDocs(collection(db, 'movies'));
          const allMovies = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecommendations(allMovies);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Lỗi khi lấy dữ liệu phim:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetail();
  }, [id]);

  if (!location.state) {
    return <h2 className="text-red-500">Không có quyền truy cập!</h2>;
  }

  if (loading) {
    return (
      <p className="text-yellow-400">
        {`Đang lấy dữ liệu phim với ID: ${id}.`}
        <br />
        {loadingTitle && `Tên phim: ${loadingTitle}`}
      </p>
    );
  }

  if (!movie) {
    return <p className="text-red-400">Không tìm thấy phim với ID: {id}</p>;
  }

  const formatArray = (value) =>
    Array.isArray(value) ? value.join(', ') : value || 'Không có';

  const handleCommentSubmit = async () => {
    // if (!currentUser) {
    //   alert('Bạn cần đăng nhập để bình luận!');
    //   return;
    // }
    // try {
    //   await addDoc(collection(db, 'comments'), {
    //     movieId: id,
    //     movieTitle: movie.title,
    //     userId: currentUser.uid,
    //     userEmail: currentUser.email,
    //     userName: isAnonymous ? 'Ẩn danh' : user.name || 'Ẩn danh',
    //     text: commentText,
    //   });
    //   setCommentText('');
    //   await fetchComments();
    //   alert('Bình luận đã được gửi!');
    // } catch (error) {
    //   console.error('Lỗi khi gửi bình luận:', error);
    //   alert('Gửi bình luận thất bại!');
    // }

    if (!currentUser) {
      alert('Bạn cần đăng nhập để bình luận!');
      return;
    }
    try {
      await addDoc(collection(db, 'comments'), {
        movieId: id,
        movieTitle: movie.title,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        text: commentText,
        isAnonymous: isAnonymous,
      });
      setCommentText('');
      await fetchComments(id);

      alert('Bình luận đã được gửi!');
    } catch (error) {
      console.error('Lỗi khi gửi bình luận:', error);
      alert('Gửi bình luận thất bại!');
    }
  };

  // const movieComments = listComments.filter(
  //   (comment) => comment.movieId === id,
  // );

  return (
    <div className="bg-[#121317] min-h-screen text-white cursor-pointer">
      <InputContainer />
      <div className="w-full h-[600px] mb-6 mt-[70px]">
        {movie.trailer.includes('youtube.com') ||
        movie.trailer.includes('youtu.be') ? (
          <iframe
            className="w-full h-full rounded shadow"
            src={convertToYoutubeEmbedUrl(movie.trailer)}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            controls
            src={movie.trailer}
            className="w-full h-full rounded shadow object-contain"
          >
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-4">
        <section className="flex items-start">
          <div className="basis-[300px] flex-none rounded-[1.25rem] bg-[rgba(25,27,36,0.6)] p-5">
            <div className="w-[160px] h-[240px] relative rounded-md overflow-hidden bg-[var(--bg-3)] mb-4">
              {movie.image && (
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>

            <h2 className="text-xl font-semibold mb-1">{movie.title}</h2>
            <p className="text-[var(--primary-text)] mb-6 font-normal">
              {movie.slug}
            </p>

            <div className="flex flex-wrap gap-2 text-xs mb-3">
              <span className="border px-2 py-1 rounded bg-gray-700">
                {movie.age}
              </span>
              <span className="border px-2 py-1 rounded bg-gray-700">
                {movie.season}
              </span>
              <span className="border px-2 py-1 rounded bg-gray-700">
                {movie.episode}
              </span>
            </div>

            <div className="text-sm text-orange-400 mb-4">
              Đã chiếu: {movie.episode || 'Không rõ'}
            </div>

            <div className="text-sm leading-relaxed">
              <p>
                <strong className="">Giới thiệu:</strong>{' '}
                <span className="text-[#aaaaaa] text-sm font-normal">
                  {movie.description || 'Không có'}
                </span>
              </p>
              <p className="mb-2">
                <strong>Thời lượng:</strong>
                <span className="text-[#aaaaaa] text-sm font-normal">
                  {movie.time || 'Không có'}
                </span>
              </p>
              <p className="mb-2">
                <strong>Quốc Gia:</strong> {formatArray(movie.region)}
              </p>
            </div>
            <hr />
            <div className="py-[20px]">
              <img
                src="https://res.cloudinary.com/dehyvlweg/image/upload/v1752677762/mPXx9031MhI_wtbfyz.webp"
                alt="banner"
              />
            </div>
            <div className="mt-[10px] w-full rounded-md overflow-hidden mb-4 p-5">
              <div className="grid grid-cols-2 gap-2">
                {actors.map((actor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm">{actor.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <h1>Top phim tuần này</h1>
            </div>
          </div>

          <div className="flex-[2.5] rounded-[1.25rem] bg-[rgba(25,27,36,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-6 p-[30px]">
              <button
                className="flex items-center justify-center gap-2 rounded-full text-black shadow-lg hover:opacity-90 transition"
                style={{
                  width: '178px',
                  height: '60px',
                  background:
                    'linear-gradient(39deg, rgba(254, 207, 89, 1), rgba(255, 241, 204, 1))',
                }}
              >
                <i className="fas fa-play text-sm"></i>
                <span className="font-medium">Xem Ngay</span>
              </button>

              <div className="flex flex-wrap items-center gap-8 text-sm text-white">
                <div className="flex flex-col items-center">
                  <i className="fas fa-heart text-lg mb-1"></i>
                  <a>Yêu thích</a>
                </div>
                <div className="flex flex-col items-center">
                  <i className="fas fa-plus text-lg mb-1"></i>
                  <a>Thêm vào</a>
                </div>
                <div className="flex flex-col items-center">
                  <i className="fas fa-paper-plane text-lg mb-1"></i>
                  <a>Chia sẻ</a>
                </div>
                <div className="flex flex-col items-center">
                  <i className="fas fa-comment-dots text-lg mb-1"></i>
                  <a>Bình luận</a>
                </div>
              </div>

              <div>
                <button className="flex items-center gap-2 px-4 py-1 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-500 transition">
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xs">
                    0
                  </span>
                  Đánh giá
                </button>
              </div>
            </div>

            <div className="pb-[30px]">
              <div className=" mx-auto mt-6 border border-white rounded overflow-hidden max-w-[896px] w-full">
                <div className="aspect-[896/111]">
                  <img
                    src="https://res.cloudinary.com/dehyvlweg/image/upload/v1752718710/c9619ISs_revboo.webp"
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-4 mb-4">
                <button
                  className={`text-sm font-semibold px-4 py-2 rounded ${showActors ? 'text-yellow-400' : 'text-white'}`}
                  onClick={() => {
                    setShowActors(true);
                    setShowRecommendations(false);
                  }}
                >
                  Diễn viên
                </button>
                <button
                  className={`text-sm font-semibold px-4 py-2 rounded ${showRecommendations ? 'text-yellow-400' : 'text-white'}`}
                  onClick={() => {
                    setShowRecommendations(true);
                    setShowActors(false);
                  }}
                >
                  Đề xuất
                </button>
              </div>
              <div className="bg-[#1c1e26] p-6 rounded-lg mt-4">
                <h2 className="text-xl font-semibold mb-4">Bình luận</h2>

                <div className="flex items-start gap-4 mb-6">
                  <img className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <textarea
                      placeholder="Viết bình luận"
                      className="w-full h-20 p-3 bg-[#2a2c38] text-white rounded  outline-none"
                      maxLength={1000}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />

                    <div className="flex items-center justify-between mt-2">
                      <label className="text-sm text-gray-400 flex items-center gap-1">
                        <input
                          type="checkbox"
                          className="accent-yellow-400"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        Ẩn Danh
                      </label>

                      <button
                        onClick={handleCommentSubmit}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-4 py-2 rounded"
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {listComments.map((item, index) => (
                  <Comments key={index} comment={item} />
                ))}
              </div>

              {showActors && (
                <div className="mt-[10px] w-full rounded-md overflow-hidden mb-4 p-5">
                  <div className="grid grid-cols-2 gap-2">
                    {actors.map((actor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm">{actor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showRecommendations && (
                <div className="mt-[10px] w-full rounded-md overflow-hidden mb-4 p-5">
                  <div className="grid grid-cols-5 gap-6">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex flex-col items-center">
                        {rec.image && (
                          <img
                            src={rec.image}
                            alt={rec.title}
                            className="w-48 h-72 rounded object-cover mb-2"
                          />
                        )}
                        <span className="text-[16px] text-center">
                          {rec.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieDetail;
