/** Fixed topographic contour lines behind the whole page. */
export default function Contours() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
      fill="none"
      stroke="#8c917a"
      strokeWidth="1.2"
      opacity="0.28"
    >
      <path d="M-40 620C120 520 90 330 260 250C430 170 560 260 680 190C800 120 960 20 1130 120C1300 220 1250 420 1480 480" />
      <path d="M-40 700C150 620 160 420 300 340C440 260 560 340 690 280C820 220 960 120 1110 210C1260 300 1210 480 1480 560" />
      <path d="M180 900C120 760 220 640 360 600C500 560 560 640 700 600C840 560 900 440 1040 460C1180 480 1240 640 1160 900" />
      <path d="M300 900C260 800 330 720 430 700C530 680 590 740 700 710C810 680 850 600 950 620C1050 640 1100 760 1050 900" />
      <path d="M1000 -20C1060 120 1210 150 1300 260C1390 370 1330 520 1480 600" />
      <path d="M-40 140C100 130 190 60 260 -20" />
    </svg>
  );
}
