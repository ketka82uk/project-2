import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'



export default function Category({ match }) {
  const id = match.params.id
  console.log('ID', match)
  console.log('ID', id)
  const [selectedCategory, updateSelectedCategory] = useState([])
  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=gb&category=${id}&apiKey=${process.env.apikeynews}`)
      .then(({ data }) => {
        const filteredArray = data.articles.filter(article => {
          return article.urlToImage && article.urlToImage.includes('http')
        })
        updateSelectedCategory(filteredArray)
      })
  }, [id])
  if (!selectedCategory[0]) return null
  return <section className="section hero is-fullheight">




    <div className="container is-max-widescreen">
      <div className="category-header is-max-widescreen is-flex is-justify-content-flex-end">
        <img src="https://i.imgur.com/ozQzxDk.png" alt="logo" style={{ height: 80, margin: 5 }} />
        <h1 style={{ color: '#595f6c' }}><span className="teal-text ml-2">ETC.</span>{id.toLowerCase()}</h1>
      </div>
    </div>

    <div className="container is-max-widescreen">
      <div className="columns is-multiline">
        {selectedCategory.map((news, index) => {
          console.log('NEWS SPLIT', news.title.split('-'))

          const newsTitle = news.title.split('-')
          newsTitle.pop()
          const newsString = newsTitle.join('')

          return <div className="column is-one-quarter" key={index}>

            <Link key={news.name} to={{
              pathname: `/category/${id}/article`,
              state: {
                news: news,
                id: id
              }

            }}>
              <div className="card category-card" key={index}>
                <div className="card-image">
                  <figure className="image is-3by2">
                    <img src={news.urlToImage} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media-content">
                    <p className="title is-7 has-text-danger">{news.source.name}
                    </p>
                  </div>
                  <div className="media-content">
                    <p className="title is-5">{newsString.length >= 70
                      ? newsString.slice(0, 70) + '...'
                      : newsString
                    }
                    </p>
                  </div>
                </div>

                <div className="content pl-5 pb-4" id="flexboxCardBottom">
                  <p className="content is-size-7" id="flexbox1Card">{
                    !news.author ? '' :
                      news.author.length >= 30
                        ? news.author.slice(0, 30) + '...'
                        : news.author
                  }   </p>
                  <p className="content is-size-7 has-text-danger" id="flexbox2Card">   Posted {moment(news.publishedAt).fromNow()}</p>

                </div>
              </div>

            </Link>
          </div>
        })}
      </div>
    </div>
  </section>
}