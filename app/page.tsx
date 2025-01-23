import Experience from "@/components/Experience";
import Link from "next/link";

interface ApiResponse {
  data: Array<{
    id: number;
    documentId: string;
    name: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    publishedAt: string; // ISO string
    description: Array<DescriptionElement>;
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
  const data = await fetch(`${process.env.API}/segments`);
  const segments: ApiResponse = await data.json();

  return (
    <div className="h-screen w-full">
      <Experience />
      {/* <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black"></div>
      <div className="w-full h-screen absolute top-0 left-0 right-0 container mx-auto px-5 xl:px-20 flex items-end">
        <div className="my-20">
          <h1 className="text-6xl lg:text-7xl 2xl:text-9xl font-black text-white uppercase my-1 leading-[80%]">
            Tractions <br /> Multiverse
          </h1>

          <div className="mt-5">
            <Link
              href="/register"
              className="lg:w-auto text-2xl font-bold bg-pink-600 px-20 py-3 block lg:inline-block rounded-full text-white hover:scale-95 transition-all focus:scale-75"
            >
              Register
            </Link>
          </div>
        </div>
      </div> */}

      <div className="min-h-screen container mx-auto px-5 xl:px-20 py-10">
        <h2>Segments {segments.meta.pagination.total}</h2>
        <div>
          {segments.data.map((segment) => (
            <div key={segment.id}>
              <h3>{segment.name}</h3>
              <p>
                {segment.description.map((d) =>
                  d.children.map((c) => c.text).join("")
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
