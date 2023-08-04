function BackgroundGradient() {
  return (
    <div
      className="absolute md:-inset-x-[calc(100%)] top-0 h-[300px] -z-10 transform-gpu"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCF2E8] -z-10 to-[#ffffff]"></div>
    </div>
  );
}

BackgroundGradient.Home = function Small() {
  return (
    <div
      className="md:block absolute inset-0 md:-inset-x-[calc(100%)] md:top-0 md:-bottom-0 md:-bottom-[calc(50%)] -z-10 transform-gpu hblur-3xl"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-b from-[#FCF2E8] to-[#ffffff]"></div>
    </div>
  );
};

export default BackgroundGradient;
