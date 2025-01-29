import Image from "next/image";

export default function Done() {
  return (
    <div className="flex pt-10 flex-col justify-center items-center gap-10 container mx-auto px-5 lg:px-20 ">
      <div className="flex-1 py-10 md:py-0">
        <Image
          width={370}
          height={104}
          src="/sponsor.png"
          alt=""
          style={{
            borderRadius: "2.8125rem",
            background: "rgba(255, 255, 255, 0.20)",
            backdropFilter: "blur(7.349999904632568px)",
          }}
          className="select-none -z-10 bg-white my-4 w-56"
        />
        <Image
          width={800}
          height={600}
          src="/banner.png"
          alt=""
          className="w-96"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">
          Thank you for registering
        </h1>
        <p className="text-center">
          We have received your registration.
        </p>
          </div>
    </div>
  );
}
