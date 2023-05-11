import { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
  graphql,
}) => {  
  const { data } = await graphql(`
    query {
      allBlogs: allContentfulBlog(
        filter: {compose__page: {
          elemMatch: {slug: {ne: null}}
        }}
      ) {
        nodes {
          page: compose__page {
            slug
          }
        }
      }
    }
  `);
  
  (data as any).allBlogs.nodes.forEach(({ page }) => {
    
    createPage({
      path: `/blogs/${page[0].slug}`,
      component: path.resolve("./src/pages/templates/blog/{blogPage.slug}.tsx"),
      context: {
        slug: page[0].slug,
      },
    })}
  );
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ 
  actions: { createTypes } 
}) => createTypes(`
  type ContentfulCardHolder implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
    contentful_id: String!
    node_locale: String!
    internalName: String
    blogs: [ContentfulBlog] @link(by: "id", from: "blogs___NODE")
    compose__page: [ContentfulComposePage] @link(by: "id", from: "compose: page___NODE") @proxy(from: "compose: page___NODE")
    spaceId: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    sys: ContentfulCardHolderSys
  }

  type ContentfulBlog implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
    contentful_id: String!
    node_locale: String!
    internalName: String
    title: String
    summary: String
    blogText: ContentfulBlogText @link(by: "id", from: "blogText___NODE")
    card_holder: [ContentfulCardHolder] @link(by: "id", from: "card holder___NODE") @proxy(from: "card holder___NODE")
    compose__page: [ContentfulComposePage] @link(by: "id", from: "compose: page___NODE") @proxy(from: "compose: page___NODE")
    spaceId: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    sys: ContentfulBlogSys
  }

  type ContentfulComposePage implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
    contentful_id: String!
    node_locale: String!
    internalName: String
    slug: String
    content: PageContentTypes @link(by: "id", from: "content___NODE")
    spaceId: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    sys: ContentfulComposePageSys
  }

  union PageContentTypes = ContentfulBlog | ContentfulCardHolder

  type ContentfulBlogText implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
    contentful_id: String!
    node_locale: String!
    text: String
    blog: [ContentfulBlog] @link(by: "id", from: "blog___NODE")
    spaceId: String
    createdAt: Date @dateformat
    updatedAt: Date @dateformat
    sys: ContentfulBlogTextSys
  }
`);
