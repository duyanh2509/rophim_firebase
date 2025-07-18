import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

function AdminUpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    async function fetchMovie() {
      try {
        const docRef = doc(db, 'movies', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            episode: Array.isArray(data.episode)
              ? data.episode.join(', ')
              : data.episode || '',
            region: Array.isArray(data.region)
              ? data.region.join(', ')
              : data.region || '',
            actor: Array.isArray(data.actor)
              ? data.actor.join(', ')
              : data.actor || '',
            type: Array.isArray(data.type)
              ? data.type.join(', ')
              : data.type || '',
          });
        } else {
          setError('Không tìm thấy phim!');
        }
      } catch (err) {
        console.error(err);
        setError('Lỗi khi lấy dữ liệu!');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    if (!newKey.trim()) return;
    setFormData((prev) => ({ ...prev, [newKey.trim()]: newValue }));
    setNewKey('');
    setNewValue('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };

      ['episode', 'region', 'actor', 'type'].forEach((field) => {
        if (updatedData[field]) {
          updatedData[field] = updatedData[field]
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        }
      });

      const docRef = doc(db, 'movies', id);
      await updateDoc(docRef, updatedData);
      alert('Cập nhật thành công!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Lỗi khi cập nhật!');
    }
  };

  if (loading) return <p className="text-yellow-400">Đang tải dữ liệu phim</p>;
  if (!formData) return <p className="text-red-400">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-gray-800 p-6 rounded-xl text-white max-w-[50vw] mx-auto"
    >
      <h2 className="text-xl font-bold mb-3">Cập nhật Phim</h2>

      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-1 font-semibold capitalize">{key}</label>
          <input
            type="text"
            name={key}
            placeholder={key}
            value={value}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
      ))}

      <div className="grid grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Tên thuộc tính mới"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="p-2 bg-gray-700 rounded col-span-1"
        />
        <input
          type="text"
          placeholder="Giá trị"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="p-2 bg-gray-700 rounded col-span-1"
        />
        <button
          type="button"
          onClick={handleAddField}
          className="bg-purple-600 hover:bg-purple-700 px-4 rounded col-span-1"
        >
          + Thêm
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
      >
        Cập nhật Phim
      </button>
    </form>
  );
}

export default AdminUpdateMovie;
