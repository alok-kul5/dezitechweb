import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";

const ContactPage = () => {
  return (
    <Section
      eyebrow="Contact"
      title="Contact Dezitech"
      description="Map, location highlights, and validation logic will be completed in later phases."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <ContactForm />
        <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">
          Map placeholder / contact details block.
        </div>
      </div>
    </Section>
  );
};

export default ContactPage;
