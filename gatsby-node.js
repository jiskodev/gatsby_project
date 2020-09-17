/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// requiring nodejs path https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_basename_path_ext
const path = require('path')


// Generating a slug for each post

/*module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if(node.internal.type === 'MarkdownRemark') {
            const slug = path.basename(node.fileAbsolutePath, '.md');
            
            createNodeField({
                node,
                name: 'slug',
                value: slug
            })
    }
    // Transform the new node here and create a new node or
    // create a new node field.

    }*/

    //Creating pages

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    //1. Get path to template

    const blogTemplate = path.resolve('./src/templates/blog.js')
    const res =  await graphql(`
    query {
        allContentfulBlogPost {
            edges {
                node {
                    slug
                }
            }
        }
    }`)

    res.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage ({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })

    //2. Get markdown data
    //3. Create new pages
}