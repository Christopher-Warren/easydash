import { useQuery } from "@apollo/client";
import { useState } from "react";
import SelectOption from "../buttons/SelectOption";

// Handle errors
// import { addError } from "../../../../redux/error/errorSlice";
// import { useAppDispatch } from "../../../../redux/hooks";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_SUBCATEGORIES,
} from "../../graphql/query_vars";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import CategoryFilter from "../filter/filter_items/CategoryFilter";
import SubcategoryFilter from "../filter/filter_items/SubcategoryList";
import PriceFilter from "../filter/filter_items/PriceFilter";
import StockFilter from "../filter/filter_items/StockFilter";

const ProductsFilter = ({
  children,
  id,
  className,
  type,
  filter,
  setFilter,
}: any) => {
  const [hide, setHide] = useState(true);

  const { data: categories } = useQuery(GET_ALL_CATEGORIES);

  const { data: subcategories } = useQuery(GET_ALL_SUBCATEGORIES);

  // State for options

  const [categoriesState, setCategoriesState] = useState<any>([]);
  const [subcategoriesState, setSubcategoriesState] = useState<any>([]);

  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [stock, setStock] = useState({ min: 0, max: 0, showOut: false });

  // handle errors
  // const dispatch = useAppDispatch();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const categoryFilter: {}[] = [];
    const subcategoryFilter: {}[] = [];

    // if (price.min > price.max) {
    //   dispatch(addError("Min price should be less than max price"));
    //   return;
    // }
    // if (stock.min > stock.max) {
    //   dispatch(addError("Min price should be less than max price"));
    //   return;
    // }

    for (let i = 0; i < e.currentTarget.length; i++) {
      const isChecked = e.currentTarget[i].checked;
      const eleName = e.currentTarget[i].name;

      if (eleName === "category option" && isChecked) {
        categoryFilter.push(e.currentTarget[i].value);
      }
      if (eleName === "subcategory option" && isChecked) {
        subcategoryFilter.push(e.currentTarget[i].value);
      }
    }

    setFilter(() => {
      const newFilter: any = [];

      if (categoryFilter.length > 0) {
        newFilter.push({
          field: "category.name",
          query: {
            in: categoryFilter,
          },
        });
      }

      if (subcategoryFilter.length > 0) {
        newFilter.push({
          field: "subcategory.name",
          query: {
            in: subcategoryFilter,
          },
        });
      }

      if (price.min && price.max > 0) {
        newFilter.push({
          field: "price",
          query: {
            gte: price.min,
            lte: price.max,
          },
        });
      }

      if ((stock.min > 0 && stock.max) || stock.max) {
        newFilter.push({
          field: "stock",
          query: {
            gte: stock.min,
            lte: stock.max,
          },
        });
      }

      return newFilter;
    });
    setHide(true);
  };

  return (
    <div
      onBlur={(e: any) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setHide(true);
        }
      }}
      className="relative"
    >
      <PrimaryButton
        onClick={(e: any) => setHide(!hide)}
        id={id}
        type={type}
        className={className}
      >
        {children}
      </PrimaryButton>

      <div
        tabIndex={0}
        className={`absolute rounded-sm overflow-hidden drop-shadow-[0_5px_8px_rgb(0,0,0,0.1)] dark:shadow-gray-900/50 
      dark:bg-gray-800 dark:text-white  transition-all 
    text-black z-40  bg-white
      ${hide && "h-0 w-0 opacity-0"} `}
      >
        <div className="flex flex-wrap  w-max text-gray-800 dark:text-gray-50">
          <form id="filter form" onSubmit={handleFormSubmit}>
            <div className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 py-5 px-5 ">
              <span className="text-xl text-center ">Filter</span>
              <div className="ml-24">
                <SecondaryButton
                  className="px-3 py-1"
                  onClick={(e: any) => {
                    e.preventDefault();

                    setSubcategoriesState([]);
                    setCategoriesState([]);
                    setFilter([]);
                    setPrice({ min: 0, max: 0 });
                    setStock({ min: 0, max: 0, showOut: false });
                    setHide(true);
                  }}
                >
                  Clear
                </SecondaryButton>
                <PrimaryButton type="submit" className="px-3 py-1 ml-3">
                  Apply
                </PrimaryButton>
              </div>
            </div>
            <SelectOption name="category">
              <CategoryFilter
                categories={categories} // use in component
                categoriesState={categoriesState}
                setCategoriesState={setCategoriesState}
              />
            </SelectOption>
            <SelectOption name="subcategory">
              <SubcategoryFilter
                categories={categories} // don't need this?
                subcategories={subcategories} // use in component
                subcategoriesState={subcategoriesState}
                setSubcategoriesState={setSubcategoriesState}
              />
            </SelectOption>
            <SelectOption name="price">
              <PriceFilter price={price} setPrice={setPrice} />
            </SelectOption>
            <SelectOption name="qty.">
              <StockFilter stock={stock} setStock={setStock} />
            </SelectOption>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
