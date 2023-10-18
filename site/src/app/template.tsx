import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Introduction } from '@/components/Introduction'
import { NavBar } from '@/components/NavBar'

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <NavBar />
      <section className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32">
        <Container dangerouslySetInnerHTML={{ __html: `<!-- content -->` }} />
      </section>
      <Footer />
    </>
  )
}
