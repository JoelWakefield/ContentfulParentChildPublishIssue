import React from 'react';
import { Grid } from '@mui/material';
import { flow, map, slice } from 'lodash/fp';

import { BlogCardDefinition } from '../BlogCard';
import BlogCard from '../BlogCard';

export default flow(
  slice(0, 3),
  map(({
    id,
    title,
    summary,
    composePage,
  }: BlogCardDefinition) => (
    <Grid
      key={id}
      item
      xs={12}
      md={4}
      px={{
        xs: 0,
        md: 0.5,
        lg: 2,
      }}
    >
      <BlogCard 
        title={title}
        summary={summary}
        slug={composePage?.[0].slug}
      />
    </Grid>
  )),
);
