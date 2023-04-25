import { graphql, useStaticQuery } from 'gatsby';

export default () => useStaticQuery(graphql`
  query {
    automatedContent: contentfulComponentAutomatedSuggestedContent(
      contentful_id: {eq: "52EqfMBCNaz5Jq6EbE37f6"}
    ) {
      ...AutomatedSuggestedContent
    }
  }
`);
