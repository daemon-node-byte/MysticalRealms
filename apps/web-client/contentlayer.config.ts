import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    author: { type: "string", required: true },
    description: { type: "string" },
    coverImage: { type: "string" }
  }
}));

export const Lesson = defineDocumentType(() => ({
  name: "Lesson",
  filePathPattern: `learn/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    category: { type: "string" },
    element: { type: "string" },
    rulingSigns: { type: "list", of: { type: "string" } },
    keywords: { type: "list", of: { type: "string" } },
    symbol: { type: "string" }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Lesson]
});
