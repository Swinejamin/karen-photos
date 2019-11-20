import { graphql, useStaticQuery } from 'gatsby';

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query getMetadata {
      site {
        siteMetadata {
          title
          description
          featured_photos {
                description
            title
            photo
          }
          infoData {
            contact {
              email
              facebook_handle
              instagram_handle
            }
            description
            background_color
          }
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
