import { PortableText } from "@portabletext/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { urlFor } from "../lib/sanity/urlFor";

const BlockContent: typeof PortableText = (props) => {
  return (
    <PortableText
      {...props}
      components={{
        types: {
          image: ({ value }) => {
            return (
              <Image
                alt="REPLACE ME"
                src={
                  value
                    ? urlFor(value).url()
                    : "https://via.placeholder.com/512x768"
                }
                layout="responsive"
                width={1}
                height={1}
                objectFit="cover"
              />
            );
          },
        },
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(BlockContent), { ssr: false });
