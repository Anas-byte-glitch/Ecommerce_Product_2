import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import Accordion from '../components/ui/Accordion'
import Container from '../components/ui/Container'
import SectionHeader from '../components/ui/SectionHeader'
import { faqs } from '../data/faqs'

// No shared sections on this page (as on the reference).
export default function Contact() {
  return (
    <>
      <section className="px-4 pt-[180px] md:px-6 lg:px-8">
        <SectionHeader eyebrow="Contact" title="We're Always Glad to Help" align="center" titleAs="h1" />
      </section>

      <section className="pt-section-sm lg:pt-section">
        <Container className="flex flex-col gap-8 lg:gap-6">
          <ContactForm />
          <ContactInfo />
        </Container>
      </section>

      <section className="py-section-sm lg:py-section">
        <Container className="flex flex-col gap-8">
          <SectionHeader eyebrow="Faq" title="Frequently Asked Questions" />
          <Accordion
            gap="gap-4"
            bodyClassName="max-w-[1075px]"
            items={faqs.map((faq) => ({ title: faq.question, content: faq.answer }))}
          />
        </Container>
      </section>
    </>
  )
}
