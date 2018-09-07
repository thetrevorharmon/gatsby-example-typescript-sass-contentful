import * as React from 'react'
import { graphql } from 'gatsby'
import * as styles from './Index.module.scss'
  
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name: string;
        tagline: string;
        githubLink: string;
      }
    }
    allContentfulMovie: {
      edges: {
        node: {
          title: string;
          description: {
            description: string;
          }
          posterImage: {
            resolutions: {
              src: string;
            }
          }
          slug: string;
          releaseDate: string;
        }
      }
    }   
  }
}
  
export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        name
        tagline
        githubLink
      }
    }
    allContentfulMovie(sort: { fields: [releaseDate] }) {
      edges {
        node {
          title
          description {
            description
          }
          posterImage {
            resolutions {
              src
            }
          }
          slug
          releaseDate(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
  
export default class IndexPage extends React.Component<IndexPageProps, {}> {
  
  renderMovieTile = (movie, index) => {
     return (
      <div key={index} className={styles.MovieTile}>
        <img src={movie.posterImage.resolutions.src} className={styles.MovieImg}  />
        <h2>{movie.title}</h2>
        <span>{movie.releaseDate}</span>
        <p>{movie.description.description}</p>
      </div>  
    )
  }
  
  public render() {
  
    const {
      name,
      tagline,
      githubLink
    } = this.props.data.site.siteMetadata
  
    const movies = this.props.data.allContentfulMovie.edges.map((edge) => edge.node)
  
    return (
      <div className={styles.Container}>
        <h1>{name}</h1>
        <p>{tagline}</p>
        <div className={styles.MovieTileWrapper}>
          {movies.map((movie, index) => this.renderMovieTile(movie, index))}
        </div>
        <a href={githubLink} className={styles.Link}>See the code on Github &rarr;</a>
      </div>
    )
  }
}
