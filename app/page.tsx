import Image from "next/image";

interface ApiResponse {
  data: Array<{
    id: number;
    documentId: string;
    name: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    publishedAt: string; // ISO string
    description: Array<DescriptionElement>;
    participation_type: string;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface DescriptionElement {
  type: "paragraph" | "heading";
  children: Array<{
    type: "text";
    text: string;
  }>;
  level?: number; // Only exists for headings
}

export default async function Home() {
  const data = await fetch(`${process.env.API}/segments`, {
    cache: "no-cache",
  });
  const segments: ApiResponse = await data.json();

  return (
    <div className="min-h-screen w-full">
      <div
        style={{
          backgroundImage: "url(/noise.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        className="w-full h-screen relative"
      >
        <div className="flex items-center justify-center gap-10 container mx-auto px-5 lg:px-20 ">
          <div className="flex-1 py-10">
            <Image
              width={800}
              height={600}
              src="/banner.png"
              alt=""
              className="w-full"
            />
          </div>
          <div className="flex-1 text-white">
            <p className="code text-6xl font-bold text-right">00: 23 : 51</p>
            <p className="text-right text-2xl">
              <small className="font-bold code">Registration ends in</small>
            </p>
            <p className="text-justify text-xl">
              Rose from the pits of hell, rise shall we again. With the
              forthcoming advent of Traction অভ্যুদয়, we, the Robotics Club of
              BRAC University, celebrate the revolution with yet another
              platform for you to channel the revolutionary in you.
            </p>
            <div>
              <a className="bg-white w-full font-black text-black mt-2 py-4 rounded-lg flex items-center justify-center text-xl gap-2 tracking-widest hover:bg-black transition-colors cursor-pointer hover:text-white">
                Register{" "}
                <Image
                  width={50}
                  height={50}
                  src="redirect.svg"
                  className="w-7"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center relative select-none">
          <Image
            width={1472}
            height={832}
            src="/astronaut.png"
            alt=""
            className="object-contain absolute -top-14 -z-0 up levitate"
          />
        </div>
      </div>
      <div className="min-h-screen container mx-auto px-5 xl:px-20 py-10">
        <h2>Segments</h2>
        <div>
          {segments.data.map((segment) => (
            <div key={segment.id}>
              <h3>{segment.name}</h3>
              <p>{segment.participation_type}</p>
              {/* <p>
                {segment.description.map((d) =>
                  d.children.map((c) => c.text).join("")
                )}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
