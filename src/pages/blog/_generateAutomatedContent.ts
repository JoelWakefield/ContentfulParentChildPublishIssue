import type { AutomatedSuggestedContentDefinition } from '#contentful/AutomatedSuggestedContent';

import queryAutomatedBlogContent from './_queryAutomatedBlogContent';
import queryAutomatedNewsContent from './_queryAutomatedNewsContent';

export default (categoryName: string): AutomatedSuggestedContentDefinition => {
  if (categoryName === 'newsroom') {
    return queryAutomatedNewsContent().automatedContent;
  }

  return queryAutomatedBlogContent().automatedContent;
};
