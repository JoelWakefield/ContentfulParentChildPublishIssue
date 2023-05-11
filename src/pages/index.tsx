import React from 'react';
import { graphql } from 'gatsby';
import { Container, Grid } from '@mui/material';
import CardHolder from '../components/CardHolder';

const HomePage = ({ data: { allBlogs: {
  blogs
}}}: any) => {
  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <CardHolder cards={blogs} />
    </Container>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query home {
    allBlogs: allContentfulBlog {
      blogs: nodes {
        ...Blog
      }
    }
  }
`;
