import React, { useEffect, useMemo } from 'react';
import { graphql } from 'gatsby';
import {
  Container,
  Typography,
  Grid,
  ThemeProvider,
} from '@mui/material';
import Box from '@mui/material/Box';
import { BLOCKS } from '@contentful/rich-text-types';
import { isEmpty } from 'lodash/fp';

import AutomatedSuggestedContent from '#contentful/AutomatedSuggestedContent';
import ChipLink from '#components/ChipLink';
import type { Category } from '#contentful/ContentfulCard';
import type { GatsbyImageProps } from '#contentful/Image';
import PageHeading from '#components/PageHeading';
import RichText from '#components/RichText';
import onScrollAnimate from '#utils/onScrollAnimate';

import useNodeTypeValidation from '#hooks/useNodeTypeValidation';
import PersonCard from '#components/PersonCard';
import type { AnySectionDefinition } from '#components/Section';
import Section from '#components/Section';
import generateAutomatedContent from './_generateAutomatedContent';
import BlogComponent from './BlogComponent';
import theme from '../course/_longTextTheme';

interface Author {
  id: string,
  name: string,
  title: string | JSX.Element,
  image?: GatsbyImageProps,
  pageTemplate: {
    composePage: {
      slug: string,
    }[],
  }[],
}

const BlogPage = ({ data }: any) => {
  useEffect(() => {
    onScrollAnimate.register([
      { className: 'reveal' },
      { className: 'flair', distanceToReveal: 200 },
    ]);
  }, []);

  const {
    title,
    subtitle,
    minuteRead,
    datePublished,
    headingBackground,
    authors,
    blogContent,
    bottomContent,
    categories,
    introParagraphPageTemplateBlogPost,
  } = data.page.content;

  const categoryName = categories?.[0].displayName;
  const hasMultipleAuthors = authors.length > 1;

  const automatedContent = useMemo(
    () => generateAutomatedContent(categoryName.toLowerCase()),
    [categoryName],
  );

  const startsWithParagraph = useNodeTypeValidation(
    blogContent[0].content,
    0,
    BLOCKS.PARAGRAPH,
  );

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <PageHeading
            {...{
              title,
              subtitle,
              minuteRead,
              datePublished,
              authors,
            }}
            background={headingBackground}
            extendContentWidth
            overline={categoryName}
            addOverlay
          />
        </Grid>

        <Grid
          item
          xs={10}
          md={8}
          lg={10}
          container
          justifyContent={{ xs: 'center', md: 'space-around' }}
          rowGap={3}
          mx="auto"
          pt={{ xs: 0, md: 6, lg: 12 }}
        >
          <Grid
            item
            xs={12}
            lg={6}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            px={{ xs: 0, lg: 4 }}
          >
            <Typography variant="body1" color="color.impblue500">
              {datePublished}
              {' '}
              |
              {' '}
              <span className="font-bold">{`${minuteRead} Minute Read`}</span>
            </Typography>
            <Box sx={{ '.MuiTypography-body2': { fontSize: '1.125rem' } }}>
              <RichText content={introParagraphPageTemplateBlogPost} />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
            container
            justifyContent={hasMultipleAuthors ? 'space-between' : 'center'}
            rowGap={5}
          >
            {!isEmpty(authors) && authors.map(({
              id,
              name,
              title: jobTitle,
              image,
              pageTemplate,
            }: Author) => (
              <Grid item key={id} pb={4} xs={12} sm={6}>
                <PersonCard
                  photo={image}
                  name={name}
                  jobTitle={jobTitle}
                  profilePage={pageTemplate}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid
          item
          xs={10}
          md={10}
          lg={10}
          container
          justifyContent="center"
          alignItems="center"
          className="blog-post-content"
          mt={startsWithParagraph ? 7 : 0}
        >
          <ThemeProvider theme={theme}>
            {!isEmpty(blogContent) && blogContent.map((component: any) => (
              <Grid item key={component.id} xs={12} md={11} lg={9} xl={8}>
                <BlogComponent content={component} />
              </Grid>
            ))}
          </ThemeProvider>

          {categories?.length && (
            <Grid
              item
              container
              columnGap={2}
              sx={{ maxWidth: 710, px: 8 }}
            >
              {categories.map(
                ({ id, displayName, listingPage }: Category) => (
                  <Grid item key={id}>
                    <Typography variant="body2" sx={{ px: '0 !important' }}>
                      <ChipLink
                        label={displayName}
                        href={`/${listingPage?.[0].composePage?.[0].slug ?? '/thoughts'}`}
                      />
                    </Typography>
                  </Grid>
                ),
              )}
            </Grid>
          )}

          {bottomContent && bottomContent.map((section: AnySectionDefinition) => (
            <Grid xs={12} key={section.id} item>
              <Section section={section} />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          mt={10}
        >
          {automatedContent && (
            <Grid item xs={12} lg={10}>
              <AutomatedSuggestedContent content={automatedContent} />
            </Grid>
          )}
        </Grid>
      </Grid>

    </Container>
  );
};

export default BlogPage;

export { Head } from '#components/Head';

export const pageQuery = graphql`
  query blog($slug: String!) {
    page: contentfulComposePage(slug: {eq: $slug}) {
      content {
        ...BlogPageTemplate
      }
      seo {
        ...SEO
      }
    }
  }
`;
