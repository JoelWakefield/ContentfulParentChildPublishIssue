import React from 'react';
import { Box } from '@mui/material';

import type { TextDefinition } from '#contentful/Text';
import Text from '#contentful/Text';
import type { ImageDefinition } from '#contentful/Image';
import Image from '#contentful/Image';
import type { QuoteDefinition } from '#contentful/Quote';
import Quote from '#contentful/Quote';

export type BlogContentDefinition =
  TextDefinition
  | ImageDefinition
  | QuoteDefinition;

type BlogContentProps = {
  content: BlogContentDefinition,
};

const BlogComponent = ({ content }: BlogContentProps) => {
  if (!content.internal?.type) {
    return null;
  }

  switch (content.internal.type) {
    case 'ContentfulComponentText':
      return (
        <Text content={content as TextDefinition} />
      );
    case 'ContentfulComponentImage':
      return (
        <Image content={content as ImageDefinition} />
      );
    case 'ContentfulComponentQuote':
      return (
        <Box my={6}>
          <Quote content={content as QuoteDefinition} />
        </Box>
      );
    default:
      throw new Error(`Unexpected type: ${JSON.stringify(content)}`);
  }
};

export default BlogComponent;
