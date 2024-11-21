interface IBackgroundOverlayProps {
  image: string;
}
export default function BackgroundOverlay({ image }: IBackgroundOverlayProps) {
  return (
    <>
      <div
        className={`-z-1 absolute w-full top-0 left-0 h-[600px] bg-cover bg-[url(${image})]`}
      ></div>

      <div className="-z-1 absolute w-full top-0 left-0 h-[600px] bg-[#00000080]"></div>
    </>
  );
}
