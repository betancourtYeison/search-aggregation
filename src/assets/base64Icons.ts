/** icons to App **/
const base64Icons = {
  searchIcon:
    'data:image/png;base64,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',
};

/** Export base64Icons **/
export default base64Icons;