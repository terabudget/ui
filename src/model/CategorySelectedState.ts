const CategoriesSelectedState = {
  ALL: true,
  NONE: null,
  SOME: false,
  of: (val: boolean | null | undefined) => {
    if (val === null) {
      return CategoriesSelectedState.SOME;
    }
    if (val === undefined || val == false) {
      return CategoriesSelectedState.NONE;
    }
    return CategoriesSelectedState.ALL;
  },
} as const;

type CategoriesSelectedState =
  (typeof CategoriesSelectedState)[keyof typeof CategoriesSelectedState];

export { CategoriesSelectedState };
