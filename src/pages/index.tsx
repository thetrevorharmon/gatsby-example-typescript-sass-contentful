import * as React from "react"
import { graphql } from "gatsby"
import './Index.scss'

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        name: string;
        tagline: string;
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
      <div key={index} className="movie-tile">
        <img src={movie.posterImage.resolutions.src} className="movie-tile-img"  />
        <h2>{movie.title}</h2>
        <span>{movie.releaseDate}</span>
        <p>{movie.description.description}</p>
      </div>
    )
  }

  public render() {
  
    const {
      name,
      tagline
    } = this.props.data.site.siteMetadata
  
    const movies = this.props.data.allContentfulMovie.edges.map((edge) => edge.node)
  
    return (
      <div className="container">
        <h1>{name}</h1>
        <p>{tagline}</p>
        <div className="movie-tile-wrapper">
          {movies.map((movie, index) => this.renderMovieTile(movie, index))}
        </div>
      </div>
    )
  }
}
