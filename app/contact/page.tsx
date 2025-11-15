import ContactForm from "@/components/ContactForm";
import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";

const contactDetails = [
  { label: "Headquarters", value: "Karad,  India" },
  { label: "UK Office", value: "Bristol, UK" },
  { label: "Email", value: "info@dezitechengineering.com" },
];

const ContactPage = () => {
  return (
    <Section
      eyebrow="Contact"
      title="Contact Dezitech"
      description="Please do contact us for any further details such as work samples, quotation or discus how we can help you."
    >
        <div className="grid gap-10 md:grid-cols-2">
          <MotionReveal>
            <ContactForm />
          </MotionReveal>
          <MotionReveal delay={0.12} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Reach us directly</h3>
            <p className="mt-3 text-sm text-gray-700">
              We stay responsive between the UK & India so project conversations, supplier coordination, and engineering
              reviews stay on track.
            </p>
            <dl className="mt-6 space-y-4">
              {contactDetails.map((item, index) => (
                <MotionReveal key={item.label} delay={0.15 + index * 0.05}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{item.label}</dt>
                  <dd className="text-sm text-gray-900">{item.value}</dd>
                </MotionReveal>
              ))}
            </dl>
          </MotionReveal>
        </div>
    </Section>
  );
};

export default ContactPage;
