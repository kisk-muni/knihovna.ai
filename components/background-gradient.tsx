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

BackgroundGradient.Radial = function Radial() {
  return (
    <div
      style={{
        position: "absolute",
        right: "0px",
        left: "0px",
        top: "0px",
        height: "80vh",
        background:
          "radial-gradient(159.9% 159.9% at 56.47% 11.47%, #FCF2E8 21.35%, rgba(251, 246, 241, 0) 61.46%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */",
      }}
    ></div>
  );
};

export default BackgroundGradient;
