import Image from "next/image";
import Link from "next/link";

// interface ApiResponse {
//   data: Array<{
//     id: number;
//     documentId: string;
//     name: string;
//     createdAt: string; // ISO string
//     updatedAt: string; // ISO string
//     publishedAt: string; // ISO string
//     description: Array<DescriptionElement>;
//     participation_type: string;
//   }>;
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }

// interface DescriptionElement {
//   type: "paragraph" | "heading";
//   children: Array<{
//     type: "text";
//     text: string;
//   }>;
//   level?: number; // Only exists for headings
// }

export default async function Home() {
  return (
    <div className="h-auto min-h-screen w-full overflow-hidden">
      <div className="w-full min-h-screen relative bg-bottom">
        <div
          style={{}}
          className="flex items-center flex-col lg:flex-row justify-center gap-10 container mx-auto px-5 lg:px-20 "
        >
          <div className="flex-1 md:py-10">
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
            <p className="text-right text-2xl mb-5">
              <small className="font-bold code">Registration ends in</small>
            </p>
            <p className="text-justify text-xl">
              Rose from the pits of hell, rise shall we again. With the
              forthcoming advent of Traction অভ্যুদয়, we, the Robotics Club of
              BRAC University, celebrate the revolution with yet another
              platform for you to channel the revolutionary in you.
            </p>
            <div className="mt-5">
              <Link href={'/register'} className="bg-white w-full font-black text-black mt-2 py-4 rounded-lg flex items-center justify-center text-xl gap-2 tracking-widest hover:bg-black transition-colors cursor-pointer hover:text-white">
                Register{" "}
                <Image
                  width={50}
                  height={50}
                  src="redirect.svg"
                  className="w-7"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex items-center justify-center relative select-none">
          <Image
            width={1472}
            height={832}
            src="/astronaut.png"
            alt=""
            className="object-contain absolute -top-14 up levitate"
          />
        </div>

        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(69,22,189,1) 36%, rgba(211,117,255,1) 100%)",
          }}
          className="absolute top-0 left-0 w-full h-full p-5 -z-10"
        >
          <Image
            width={1600}
            height={900}
            src={"/noise.png"}
            alt="noisy background"
            className="absolute top-0 left-0 w-full h-full "
          />
        </div>
      </div>
    </div>
  );
}
