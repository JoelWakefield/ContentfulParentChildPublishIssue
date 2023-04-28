import React from 'react';
import { Grid } from '@mui/material';
import { flow, map, slice } from 'lodash/fp';


import type { 
  BlogCardDefinition, 
  BlogCardProps 
} from './BlogCard';
import BlogCard from './BlogCard';

export type CardHolderProps = {
  cards: BlogCardProps[],
};

const CardHolder = ({ cards }: CardHolderProps) => (
  <Grid
    container
    justifyContent='center'
    rowGap={4}
    textAlign="left"
  >
    {flow(
      slice(0, 3),
      map(({
        id,
        title,
        summary,
        page,
      }: BlogCardDefinition) => (
        <Grid
          key={id}
          item
          xs={12}
          md={4}
          px={{ xs: 0, md: 2 }}
        >
          <BlogCard 
            title={title}
            summary={summary}
            slug={`blogs/${page?.[0].slug}`}
          />
        </Grid>
      )),
    )(cards)}
  </Grid>
);

export default CardHolder;
