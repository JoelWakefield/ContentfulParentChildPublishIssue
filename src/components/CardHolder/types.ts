import type { Category } from '#contentful/ContentfulCard';
import type {
  ContentfulComponentDefinition,
} from '#contentful/ContentfulComponentDefinition';
import type { ContentfulAlignment } from '#hooks/useContentfulAlignment';

export type BlogCategoryDefinition = ContentfulComponentDefinition & {
  displayName: string,
  isPrimary: boolean,
  listingPage: {
    composePage: {
      slug: string,
    }[],
  }[],
  contentfulId: string,
  internal: {
    type: 'ContentfulSubComponentBlogCategory',
  },
};

export type CardsPerRow = 3 | 4 | 5 | 6;
export type RowsPerGroup = 1 | 2 | 3 | 4;

export type CardHolderListingOptions = {
  cardsPerRow?: CardsPerRow,
  rowsPerGroup?: RowsPerGroup,
  horizontalAlignment?: ContentfulAlignment,
  autofill?: boolean,
  categoryFilter?: Category,
};
