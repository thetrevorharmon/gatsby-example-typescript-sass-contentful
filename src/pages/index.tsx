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
    allContentfulMovie {
      edges {
        node {
          title
        }
      }
    }
  }
`

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  
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
        <ul>
          {movies.map((movie, index) => {
            return <li key={index}>{movie.title}</li>
          })}
        </ul>
      </div>
    )
  }
}
