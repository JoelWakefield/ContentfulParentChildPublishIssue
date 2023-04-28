import React from 'react';
import { graphql } from 'gatsby';
import { Container, Grid } from '@mui/material';
import CardHolder from '../components/CardHolder';

const HomePage = ({ data: { page: { content: { 
  blogs: cards 
}}}}: any) => {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item my={10}>
          <CardHolder cards={cards} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query home {
    page: contentfulComposePage(
      slug: {eq: "card-page"}
    ) {
      content {
        ... on ContentfulCardHolder {
          blogs {
            id
            contentfulId: contentful_id
            title
            summary
            page: compose__page {
              slug
            }
          }
        }
      }
    }
  }
`;
