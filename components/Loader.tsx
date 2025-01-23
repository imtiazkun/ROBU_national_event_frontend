import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <div className="bg-slate-900 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div>{progress} %</div>
    </div>
  );
}
