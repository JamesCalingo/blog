export const filterAndReversePosts = (posts) => {
  return posts
    .filter((post) => post.frontmatter.published === true)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}