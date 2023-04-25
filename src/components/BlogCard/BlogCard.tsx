import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Link } from 'gatsby-link';

export type BlogCardDefinition = {
  title: string,
  summary: string,
  composePage: {
    slug: string
  }[],
  contentfulId: string,
  id: string,
  internal: {
    type: 'ContentfulBlog'
  }
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
    <Link to={slug}>
      <Card elevation={0}>
        <CardContent
          sx={{
            minHeight: 'calc(100% - 336px)',
          }}
        >
          <Typography
            variant="h4"
            sx={{ mt: 0.5, mb: 1 }}
          >
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
    </Link>
  );

export default BlogCard;
