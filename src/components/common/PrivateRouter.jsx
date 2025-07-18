import { useAuth } from '../../contexts/AuthContext';

const PrivateRouter = ({ children: protectedContent }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="text-white text-center p-4">
        Đang kiểm tra đăng nhập...
      </div>
    );
  }

  if (!currentUser) {
    window.location.href = '/login';
    return null;
  }

  return protectedContent;
};

export default PrivateRouter;
