import ContactForm from '@/src/components/Forms/ContactForm';

export default function ContactFormPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh]">
      <h1 className="text-2xl font-bold pb-10">
        Nous contacter
      </h1>
      <ContactForm />
    </div>
  );
}
