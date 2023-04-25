export interface Storage {
  pageSlug: string,
  paginationNumber: number,
  scrollPosition?: number
}

const storageName = 'impListing';

const getData = (): Storage[] | [] => (localStorage.getItem(storageName)
  ? JSON.parse(localStorage.getItem(storageName) ?? '')
  : []);

const getDataExcludePage = (pageSlug: string): Storage[] | [] => getData()
  .filter((obj) => obj.pageSlug !== pageSlug);

const getPageData = (pageSlug: string): Storage | undefined => getData()
  .find((obj) => obj.pageSlug === pageSlug);

const updateStorage = (pageSlug: string, data: Partial<Storage>) => {
  const newData = [
    ...getDataExcludePage(pageSlug),
    {
      ...getPageData(pageSlug),
      ...data,
    },
  ];
  localStorage.setItem(storageName, JSON.stringify(newData));
};

export const getStoredData = (pageSlug?: string) => {
  if (!pageSlug) {
    // eslint-disable-next-line no-console
    console.warn('pageSlug was not provided.');
    return null;
  }

  return pageSlug
    ? getPageData(pageSlug)
    : null;
};

export const setScrollPosition = (pageSlug: string, scrollPosition: number) => {
  if (!pageSlug || !scrollPosition) {
    // eslint-disable-next-line no-console
    console.warn('pageSlug and/or scrollPosition was not provided.');
    return;
  }
  updateStorage(pageSlug, { pageSlug, scrollPosition });
};

export const updatePaginationNumber = (pageSlug: string, paginationNumber: number) => {
  if (!pageSlug || !paginationNumber) {
    // eslint-disable-next-line no-console
    console.warn('pageSlug and/or paginationNumber was not provided.');
    return;
  }
  updateStorage(pageSlug, { pageSlug, paginationNumber });
};
