import { graphql, useStaticQuery } from 'gatsby';

export default () => useStaticQuery(graphql`
  query {
    automatedContent: contentfulComponentAutomatedSuggestedContent(
      contentful_id: {eq: "16hfZHXbpTtF2vT4tykXe0"}
    ) {
      ...AutomatedSuggestedContent
    }
  }
`);
