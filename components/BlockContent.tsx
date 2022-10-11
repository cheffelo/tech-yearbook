import SanityBlockContent from "@sanity/block-content-to-react";
import dynamic from "next/dynamic";

const BlockContent = (props) => {
  return <SanityBlockContent {...props} />;
};

export default dynamic(() => Promise.resolve(BlockContent), { ssr: false });
