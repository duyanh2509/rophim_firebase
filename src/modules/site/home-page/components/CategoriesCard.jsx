function CategoriesCard({ categories }) {
  const bgColor = [
    'bg-red-500',
    'bg-blue-400',
    'bg-green-600',
    'bg-yellow-300',
    'bg-purple-700',
    'bg-pink-500',
    'bg-indigo-400',
    'bg-teal-500',
    'bg-orange-400',
    'bg-emerald-600',
  ];
  const index = categories.id % 10;
  const categoryColor = bgColor[index];
  return (
    <div
      className={`${categoryColor}  flex items-center justify-center w-full min-h-[110px] rounded-[15px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg `}
    >
      <div className="px-[10px] py-0 max-h-[110px] flex flex-col items-start justify-end gap-3">
        <h3 className="text-[22.4px] font-bold text-white">
          {categories.name}
        </h3>
        <a className="text-[14px] font-medium text-white">Xem Toàn Bộ</a>
      </div>
    </div>
  );
}
export default CategoriesCard;
