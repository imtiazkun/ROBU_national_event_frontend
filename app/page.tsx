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
    <div className="h-screen w-full">
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
