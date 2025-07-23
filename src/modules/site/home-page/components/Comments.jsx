export function Comments({ comment }) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-700 text-white">
      <img className="w-10 h-10 rounded-full object-cover" />

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-white">
            {comment.userName || 'Ẩn danh'}
          </span>
          {comment.userName === 'Ẩn danh' && (
            <span className="text-yellow-400">∞</span>
          )}
        </div>

        <p className="text-sm text-gray-300">{comment.text}</p>
      </div>
    </div>
  );
}
