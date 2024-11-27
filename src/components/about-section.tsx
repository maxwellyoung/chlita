import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-8">ABOUT CH&apos;LITA</h2> */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <p className="text-xl leading-relaxed">
              Ch’lita is a stylist who excels at creating images that resonate
              with today’s visual culture. With a keen understanding of what
              captures attention now, combined with a deep knowledge of fashion
              history. What sets her work apart is the ability to blend modern
              relevance with a rich understanding of fashion’s past, producing
              images that feel both current and enduring.
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
