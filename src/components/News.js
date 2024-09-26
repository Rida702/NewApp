import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {
  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(false)
  const[page, setPage] = useState(1)
  const[totalResults, setTotalResults] = useState(0)
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);

  }

  const updateNews = async () => {
    props.setProgress(10);
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url_endpoint);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(()=> {
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line 
  },[])

  // const handelPreviousClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // }

  // const handelNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // }
  const fetchMoreData = async () => {    
    // setPage(page + 1)
    // let newPage = page + 1;
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;    
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    setPage(page + 1);
  };
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px' , marginTop:'90px' }} >NewMonkey - Top {capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {articles.filter((element) => element.title !== "[Removed]" && element.description !== "[Removed]").map((element) => {
                return <div className="col-md-4" key={element.url ? element.url : "/"}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.mos.cms.futurecdn.net/mLsWb5UBE2sX9AkoKSrCri-1200-80.jpg"} newsUrl={element.url ? element.url : "/"} date={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: "health"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
