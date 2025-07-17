import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useFetchData = () => {
  const [listMovies, setListMovies] = useState([]);
  const [listBanners, setListBanners] = useState([]);
  const [listCategories, setListCategories] = useState([]);

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

  useEffect(() => {
    fetchMovies();
    fetchBanners();
    fetchCategories();
  }, [fetchMovies, fetchBanners, fetchCategories]);

  return {
    listMovies,
    listBanners,
    listCategories,
    fetchMovies,
    fetchBanners,
    fetchCategories,
    setListMovies,
  };
};
