import { Loading } from "@/ui/components/loading";
import { Products } from "@/ui/pages/products";
import { Suspense } from "react";

export default function ProductsScreen() {
  return (
    <Suspense fallback={<Loading />}>
      <Products />
    </Suspense>
  );
}
