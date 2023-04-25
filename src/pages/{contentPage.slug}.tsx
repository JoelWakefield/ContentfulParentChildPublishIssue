import React from 'react';
import { graphql } from 'gatsby';
import { Container, Grid } from '@mui/material';
import CardHolder from '../components/CardHolder/CardHolder';

const ContentPage = ({
  data,
}: any) => {
  const { cardHolder } = data.page.content;

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item my={10}>
          <CardHolder {...cardHolder} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentPage;

export const pageQuery = graphql`
  query content($slug: String!) {
    page: contentfulComposePage(slug: {eq: $slug}) {
      content {
        cardHolder {
          ...CardHolder
        }
      }
    }
  }
`;
