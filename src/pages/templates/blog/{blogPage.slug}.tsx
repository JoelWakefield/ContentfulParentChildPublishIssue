import React from 'react';
import { graphql } from 'gatsby';
import {
  Container,
  Grid,
} from '@mui/material';

const BlogPage = ({ data: { page: { content: {
  title,
  summary,
}}}}: any) => {
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
          title
          summary
        }
      }
    }
  }
`;
