import { useProducts } from "@/shop/hooks/useProducts";
import { CustomPagination } from "../../../components/custom/CustomPagination";
import { CustomJumbotron } from "../../components/CustomJumbotron";
import { ProductsGrid } from "../../components/ProductsGrid";

export const HomePage = () => {
  const { data } = useProducts();

  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductsGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
