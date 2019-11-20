import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query getMetadata {
      site {
        siteMetadata {
          title
          description
          infoData {
            contact {
              email
              facebook_url
              instagram_url
            }
            cta
            description
            background_color
          }
        }
      }
    }
  `)
  return data.site.siteMetadata
}
