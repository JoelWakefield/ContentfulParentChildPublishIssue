import React from 'react';
import { graphql } from 'gatsby';
import {
  Container,
  Grid,
} from '@mui/material';

const BlogPage = ({ data: { 
  page: { 
    content: {
      title,
      summary,
      blogText: {
        text
      }
    }
  },
}}: any) => {
  return (
    <Container maxWidth="xl">
      <Grid 
        container 
        justifyContent="center" 
        textAlign='center' 
        rowGap={4}
      >
        <Grid item xs={12}>
          {title}
        </Grid>
        <Grid item xs={12}>
          {summary}
        </Grid>
        <Grid item xs={12}>
          {text}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query blog($slug: String!) {
    page: contentfulComposePage(slug: {eq: $slug}) {
      content {
        ... on ContentfulBlog {
          ...Blog
        }
      }
    }
  }

  fragment Blog on ContentfulBlog {
    id
    contentfulId: contentful_id
    title
    summary
    blogText {
      contentfulId: contentful_id
      text
    }
    page: compose__page {
      contentfulId: contentful_id
      slug
    }
  }
`;
