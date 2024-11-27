import Image from "next/image";

export function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center p-4">
      <Image
        src="/chlitacorp.png"
        alt="Ch'lita Corp"
        width={500}
        height={500}
        className="mb-8"
        priority
      />
      <p className="text-xl md:text-2xl text-center max-w-2xl">
        Ch&apos;lita is a London-based stylist.
      </p>
    </section>
  );
}
