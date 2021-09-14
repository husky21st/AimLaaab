import type { NextPage } from "next";
import dynamic from "next/dynamic";
import DoMagic from "components/DoMagic";

const MyCanvasWithNoSSR = dynamic(
  () => import("../components/MyCanvas"),
  { ssr: false }
)

const Home: NextPage = () => {
  return (
      <>
        <DoMagic />
        <MyCanvasWithNoSSR />
      </>
  );
};

export default Home;
