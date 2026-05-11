type LoaderProps = {
  width?: string;
};

export default function Loader({ width }: LoaderProps) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="loader" style={{width: width}}></div>
    </div>
  );
}
