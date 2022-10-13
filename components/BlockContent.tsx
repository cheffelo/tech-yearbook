import { PortableText } from "@portabletext/react";
import dynamic from "next/dynamic";

const BlockContent: typeof PortableText = (props) => {
  return <PortableText {...props} />;
};

export default dynamic(() => Promise.resolve(BlockContent), { ssr: false });
