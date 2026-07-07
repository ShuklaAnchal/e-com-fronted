"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProductbyID } from "@/app/store/action/productAction";

import ProductHeader from "@/app/component/productDetailesPage/ProductHeader";
import BasicInfoCard from "@/app/component/productDetailesPage/BasicInfoCard";
import DescriptionCard from "@/app/component/productDetailesPage/DescriptionCard";
import VariantList from "@/app/component/productDetailesPage/VariantList";
import ShippingCard from "@/app/component/productDetailesPage/ShippingCard";
import PolicyCard from "@/app/component/productDetailesPage/PolicyCard";
import ExperienceCard from "@/app/component/productDetailesPage/ExperienceCard";
import AdvancedFeatureCard from "@/app/component/productDetailesPage/AdvancedFeatureCard";
import SeoCard from "@/app/component/productDetailesPage/SeoCard";

const Page = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const productData = useSelector((state) => state.product.product);
  console.log({ productData });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductbyID(id));
    }
  }, [dispatch, id]);

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Product...
      </div>
    );
  }

  const product = productData.product;
  console.log({ product });

  const variants = productData.variants || [];

  if (!productData || !productData.product) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading Product...
      </div>
    );
  }
  return (
    <div className="h-screen bg-gray-100 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <ProductHeader product={product} />

        <BasicInfoCard product={product} />

        <DescriptionCard product={product} />

        <VariantList variants={variants} />

        <ShippingCard shipping={product.shipping} />

        <PolicyCard policies={product.policies} />

        <ExperienceCard experience={product.experience} />

        <AdvancedFeatureCard features={product.advancedFeatures} />

        <SeoCard seo={product.seo} />
      </div>
    </div>
  );
};

export default Page;
  