import { Suspense } from "react";
import OrderSuccessContent from "@/app/component/order/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-[#C5A880]/30 border-t-[#C5A880] animate-spin" />

            <p className="text-sm text-gray-500">
              Loading order details...
            </p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}