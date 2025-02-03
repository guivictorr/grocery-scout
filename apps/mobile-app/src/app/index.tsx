import { Suspense } from "react";

import { Loading } from "@/ui/components/loading";
import { Home } from "@/ui/pages/home";

export default function Index() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}
