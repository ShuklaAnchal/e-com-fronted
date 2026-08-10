import Hero from "@/app/component/mainpage/Hero";
import Collection from "@/app/component/mainpage/Collection";
import Products from "@/app/component/mainpage/Products";
import About from "@/app/component/mainpage/About";
import OfflinePreseance from "@/app/component/mainpage/OfflinePreseance";
import TestimonialSlider from "@/app/component/mainpage/Testimonials";
import ReelProducts from "@/app/component/mainpage/ReelProducts";
import Header from "@/app/component/mainpage/Header";
import Footer from "@/app/component/resuable/Footer";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Banner from "@/app/component/mainpage/Banner";
import Tranding from "@/app/component/mainpage/tranding"
import Exclusively from "@/app/component/mainpage/exclusively";
import HomeBlogSection from "@/app/component/mainpage/HomeBlogSection";

export default function Home() {
  return (
    <main className="flex flex-col webprimarycolor">
      <MarqueeBar />
      <Header />
      <div className="flex flex-col gap-6 webprimarycolor">
        <Hero />
        <ReelProducts />
        <Collection />
        <Banner />
        <Products />
        <Tranding />
        <OfflinePreseance />
        <HomeBlogSection />
        <TestimonialSlider />
        {/* <About /> */}
        <div>
          <Exclusively />
          <Footer />
        </div>
      </div>
    </main>
  );
}
