import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../services";
import { Categories } from "../types";




const Categories = () => {
    const [categories, setCategories] = useState<Array<Categories>>([])

useEffect(() => {

  getCategories()
  .then((newCategories) => setCategories(newCategories))

}, [])

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            Categories
            </h3>
            {categories.map((category) =>(
                <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                >
                    <span className="cursor-pointer block mb-3 pb-3">
{category.name}
                    </span>
                </Link>
            ))

            }
        </div>
    );
}

export default Categories;