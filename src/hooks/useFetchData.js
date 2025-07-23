import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';

export const useFetchData = () => {
  const [listMovies, setListMovies] = useState([]);
  const [listBanners, setListBanners] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listAccounts, setListAccounts] = useState([]);
  const [listComments, setListComments] = useState([]);
  const [user, setUser] = useState();
  const { currentUser } = useAuth();

  const fetchMovies = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'movies'));
      const movies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListMovies(movies);
    } catch (err) {
      console.error('Lỗi khi lấy movies:', err);
      setListMovies([]);
    }
  }, []);

  const fetchBanners = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'banners'));
      const banners = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListBanners(banners);
    } catch (err) {
      console.error('Lỗi khi lấy banners:', err);
      setListBanners([]);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListCategories(categories);
    } catch (err) {
      console.error('Lỗi khi lấy categories:', err);
      setListCategories([]);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'accounts'));
      const accounts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListAccounts(accounts);
    } catch (err) {
      console.error('Lỗi khi lấy accounts:', err);
      setListAccounts([]);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      if (!currentUser?.uid) return;

      const userRef = doc(db, 'accounts', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser({ id: userSnap.id, ...userSnap.data() });
      } else {
        console.warn('Không tìm thấy thông tin người dùng.');
        setUser(null);
      }
    } catch (err) {
      console.error('Lỗi khi lấy user:', err);
      setUser(null);
    }
  }, [currentUser?.uid]);

  const fetchComments = useCallback(async (movieId) => {
    try {
      if (!movieId) return;

      const q = query(
        collection(db, 'comments'),
        where('movieId', '==', movieId),
      );
      const snapshot = await getDocs(q);

      const commentDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Lấy thông tin user cho từng comment (song song)
      const enrichedComments = await Promise.all(
        commentDocs.map(async (comment) => {
          try {
            const userRef = doc(db, 'accounts', comment.userId);
            const userSnap = await getDoc(userRef);

            return {
              ...comment,
              userName: !comment.isAnonymous ? userSnap.data().name : 'Ẩn danh',
            };
          } catch (error) {
            console.error('Lỗi lấy user từ comment:', error);
            return {
              ...comment,
              userName: 'Lỗi tải người dùng',
            };
          }
        }),
      );

      setListComments(enrichedComments);
    } catch (err) {
      console.error('Lỗi khi lấy comments:', err);
      setListComments([]);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    fetchBanners();
    fetchCategories();
    fetchAccounts();
    fetchComments();
    fetchUser();
  }, [
    fetchMovies,
    fetchBanners,
    fetchCategories,
    fetchAccounts,
    fetchComments,
    fetchUser,
  ]);

  return {
    listMovies,
    listBanners,
    listCategories,
    listAccounts,
    listComments,
    user,

    fetchMovies,
    fetchBanners,
    fetchCategories,
    fetchAccounts,
    fetchComments,
    setListMovies,
    fetchUser,
  };
};
