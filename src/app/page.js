import Hero from '@/app/component/mainpage/Hero'
import Collection from '@/app/component/mainpage/Collection'
import Products from '@/app/component/mainpage/Products'
import About from '@/app/component/mainpage/About'
import MarqueeBarBottom from '@/app/component/mainpage/MarqueeBarBottom'
import TestimonialSlider from '@/app/component/mainpage/TestimonialSlider'
import ReelProducts from '@/app/component/mainpage/ReelProducts'
import Header from '@/app/component/mainpage/Hearder'
import Footer from '@/app/component/resuable/Footer'
import MarqueeBar from '@/app/component/mainpage/MarqueeBar'
import Banner from "@/app/component/mainpage/Banner";

export default function Home() {
  return (
    <main>
              <MarqueeBar />
        <Header />
      <section id="home">
        <Hero />
      </section>
            <Collection />
      <ReelProducts />
     <Banner />
      <section id="products">
        <Products />
      </section>
      <TestimonialSlider />
      <About />
      {/* <MarqueeBarBottom /> */}
      <Footer />
    </main>
  )
}