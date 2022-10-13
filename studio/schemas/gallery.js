const gallery = {
  name: "gallery",
  type: "document",
  title: "Gallery",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Gallery name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      images: "images",
      image: "images.0",
    },
    prepare(selection) {
      const { images, image, name } = selection;

      return {
        title: name,
        subtitle: `Gallery block of ${Object.keys(images).length} images`,
        media: image,
      };
    },
  },
};

export default gallery;
