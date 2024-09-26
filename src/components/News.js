import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "health"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    console.log("Page No " + this.state.page)
  }

  async updateNews() {
    console.log("Page No " + this.state.page)
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }


  async componentDidMount() {
    console.log("Page No " + this.state.page)
    this.updateNews();
  }

  handelPreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    })
    this.updateNews();
  }

  handelNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    })
    this.updateNews();
  }
  fetchMoreData = async () => {    
    let nextPage = this.state.page + 1;
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9414ea6183044b38934f41098922bcb&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: nextPage, 
    });
  };

  render() {
    console.log("Render")
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px' }} >NewMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.filter((element) => element.title !== "[Removed]" && element.description !== "[Removed]").map((element) => {
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
}

export default News
