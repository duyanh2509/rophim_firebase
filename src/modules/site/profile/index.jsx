import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useFetchData } from '../../../hooks/useFetchData';

function UserProfile() {
  const { user, fetchUser } = useFetchData();
  useEffect(() => {
    fetchUser();
  }, []);
  console.log('........', user);

  return;
}
export default UserProfile;
