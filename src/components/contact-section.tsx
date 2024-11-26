import Image from "next/image";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">GET IN TOUCH</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <Image
              src="/CHLITAICON.webp"
              alt="Ch'lita logo"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4 text-xl">
            <p>For inquiries and collaborations:</p>
            <a
              href="mailto:info@chlita.com"
              className="block hover:under
line"
            >
              info@chlita.com
            </a>
            <a
              href="https://instagram.com/chlita"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline"
            >
              @chlita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
