/* eslint-disable @next/next/no-img-element */
import { Category } from "@/db/schema";

export const CategoriesList = ({
  categories,
}: {
  categories: { category: Category }[];
}) => {
  return (
    <div className="gap-1 flex flex-wrap">
      {categories.map(({ category }, c) => (
        <span
          key={c}
          className="text-[13px] flex p-0.5 text-text bg-neutral-100 whitespace-nowrap rounded-md px-1"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};
