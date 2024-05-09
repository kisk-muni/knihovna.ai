function BackgroundGradient() {
  return (
    <div
      className="absolute md:-inset-x-[calc(100%)] top-0 h-[300px] max-w-full -z-20 transform-gpu"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCF2E8] max-w-full -z-20 to-[#ffffff]"></div>
    </div>
  );
}

BackgroundGradient.Radial = function Radial() {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: -20,
        width: "100vw",
        left: "0px",
        top: "0px",
        height: "500px",
        background:
          "radial-gradient(159.9% 159.9% at 56.47% 15%, #FCF2E8 10%, rgba(255, 255, 255, 0) 60%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */",
      }}
    ></div>
  );
};

export default BackgroundGradient;
