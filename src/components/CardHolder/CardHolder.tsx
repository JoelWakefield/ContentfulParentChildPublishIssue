import React from 'react';
import { Grid } from '@mui/material';

import renderCardSet from './renderCardSet';
import { BlogCardProps } from '../BlogCard';

export type CardHolderProps = {
  cards: BlogCardProps[],
};

const CardHolder = ({ cards }: CardHolderProps) => (
  <Grid
    container
    direction={{ xs: 'column', md: 'row' }}
    justifyContent={{ xs: 'flex-start', md: 'space-around' }}
    alignItems={{ xs: 'stretch', md: 'flex-start' }}
    rowGap={{ xs: 5, md: 9 }}
    textAlign="left"
    mb={4}
    px={{ xs: 2, md: 0 }}
  >
    {renderCardSet(cards)}
  </Grid>
);

export default CardHolder;
