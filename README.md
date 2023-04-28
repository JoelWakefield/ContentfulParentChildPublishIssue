# Child Publish Disconnects from Parents

This site is a replication of a publishing issue with Contentful/Gatsby; backlinks from a child entry to a parent are broken when said child is updated. 

## Action

Lets say you want to auto generate some blog cards based on the blog pages you create - perfectly doable. You use the back-linking feature 

```
page: [ContentfulPage] @link(by: "id", from: "page___NODE") @proxy(from: "page___NODE")
```

... to get the navigation info of the page the blog sits on.

```
page {
  slug
}
```

This works completely fine, but there is one issue.

## Issue

If you make an update to the blog - the link to it's page is somehow broken in the site - the blog card suddenly doesn't have the navigation info.

## "Fix"

The workaround to this issue is to re-publish the page component - this will restore the link; the card will link to the blog page as before.

## Solition

I don't know why this occurs - this link usses the `id` of the page, which does not ever change - so why does the link to a parent entry break when a child of said parent is updated? 