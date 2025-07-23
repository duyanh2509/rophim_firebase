import { useFetchData } from '../../../../hooks/useFetchData';
import CategoriesCard from './CategoriesCard';

function ListCategories() {
  const { listCategories } = useFetchData();

  return (
    <div className=" w-full rounded-2xl bg-[#191b24] p-[20px] pb-[50px]">
      <h2 className="text-2xl font-bold text-white mb-4">
        Bạn Đang Quan Tâm Gì
      </h2>
      <div className="grid grid-cols-7 gap-4 pt-0 pr-5 pb-5 pl-5">
        {listCategories.map((category) => (
          <CategoriesCard key={category.id} categories={category} />
        ))}
      </div>
    </div>
  );
}
export default ListCategories;
