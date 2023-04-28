import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

export type BlogCardDefinition = {
  title: string,
  summary: string,
  page: {
    slug: string
  }[],
  id: string,
};

export type BlogCardProps = {
  title: string,
  summary: string,
  slug: string
};

const BlogCard = ({
  title,
  summary,
  slug,
}: BlogCardProps) => (
  <Card elevation={2}>
    <CardContent sx={{ minHeight: 'calc(100% - 336px)' }}>
      <Typography variant="h4">
        {title}
      </Typography>

      <Typography variant="body2">
        {summary}
      </Typography>
    </CardContent>

    <CardActions>
      <Button variant="contained" href={slug}>
        Read Blog
      </Button>
    </CardActions>
  </Card>
);

export default BlogCard;
