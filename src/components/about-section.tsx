import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">ABOUT CH&apos;LITA</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <p className="text-xl leading-relaxed">
              With an avant-garde approach and an eye for the extraordinary,
              Ch&apos;lita&apos;s work is a fusion of art, culture, and
              innovation. Her unique vision transforms ordinary shoots into
              extraordinary narratives, challenging perceptions and defining new
              eras in fashion.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/F1000011.webp"
              alt="Ch'lita portrait"
              width={500}
              height={750}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
