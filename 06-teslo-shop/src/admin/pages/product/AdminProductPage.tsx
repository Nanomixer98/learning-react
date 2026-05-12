import { useProduct } from "@/admin/hooks/useProduct";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import type { Product } from "@/interfaces/product.interface";
import { Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { ProductForm } from "./ui/ProductForm";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data: product, mutation } = useProduct(id || "");
  const { isPending } = mutation;

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle: string =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Product updated succesfully", {
          position: "top-right",
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Error updating product");
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      product={product}
      title={title}
      subTitle={subtitle}
      onSubmit={handleSubmit}
      isSaving={isPending}
    />
  );
};
