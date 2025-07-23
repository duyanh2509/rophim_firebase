import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../../firebase/firebaseConfig';

function AdminAddMovie({ addMovie }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    age: '',
    season: '',
    episode: '',
    description: '',
    image: '',
    time: '',
    region: '',
    actor: '',
    type: '',
    trailer: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      title: formData.title,
      slug: formData.slug,
      age: formData.age,
      season: formData.season,
      episode: formData.episode
        ? formData.episode
            .split(',')
            .map((e) => e.trim())
            .filter(Boolean)
        : [],
      description: formData.description,
      image: formData.image,
      time: formData.time,
      region: formData.region
        ? formData.region
            .split(',')
            .map((r) => r.trim())
            .filter(Boolean)
        : [],
      actor: formData.actor
        ? formData.actor
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean)
        : [],
      type: formData.type
        ? formData.type
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      trailer: formData.trailer,
    };

    try {
      const docRef = await addDoc(collection(db, 'movies'), newMovie);
      const movieWithId = { id: docRef.id, ...newMovie };

      addMovie(movieWithId);

      setFormData({
        title: '',
        slug: '',
        age: '',
        season: '',
        type: '',
        episode: '',
        description: '',
        image: '',
        time: '',
        region: '',
        actor: '',
        trailer: '',
      });
      setError('');
      alert('Đã thêm phim!');
    } catch (err) {
      console.error(err);
      setError('Lỗi khi thêm phim!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mt-[75px] bg-gray-800 p-6 rounded-xl text-white"
    >
      <h2 className="text-xl font-bold mb-3">Thêm Phim Mới</h2>

      {[
        { name: 'title', type: 'text', placeholder: 'Title' },
        { name: 'slug', type: 'text', placeholder: 'Slug' },
        { name: 'age', type: 'text', placeholder: 'Allow Age' },
        { name: 'season', type: 'text', placeholder: 'Season' },
        { name: 'episode', type: 'text', placeholder: 'Episodes' },
        { name: 'type', type: 'text', placeholder: 'Types' },
        { name: 'description', type: 'text', placeholder: 'Description' },
        { name: 'image', type: 'text', placeholder: 'Image URL' },
        { name: 'time', type: 'text', placeholder: 'Time' },
        { name: 'region', type: 'text', placeholder: 'Regions' },
        { name: 'actor', type: 'text', placeholder: 'Actors' },
        { name: 'trailer', type: 'text', placeholder: 'Trailer URL' },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded"
        />
      ))}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
      >
        Save Movie
      </button>
    </form>
  );
}

export default AdminAddMovie;
