const alumn = {
  name: "alumn",
  title: "Alumn",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "tag",
      title: "Tag",
      type: "reference",
      to: { type: "media.tag" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "questionnaire",
      title: "Questionnaire",
      type: "array",
      of: [
        {
          name: "answer",
          title: "Answer",
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
            },
            {
              name: "answer",
              title: "Answer",
              type: "array",
              of: [
                {
                  title: "Block",
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};

export default alumn;
