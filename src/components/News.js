import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize : 8, 
    category : "health"
  }
  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number, 
    category : PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalresults : 0
    }
  }
  async componentDidMount(page){
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalresults : parsedData.totalResults,
      loading: false
    })
  }

  handelPreviousClick = async() => {
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page : this.state.page - 1,
      loading: false
    })
  }

  handelNextClick = async () => {
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page : this.state.page + 1,
      articles: parsedData.articles,
      loading: false
      })
  }
 
  render() {
    console.log("Render")
    return (
      <div className='container my-3'  >
        <h1 className="text-center" style={{margin:'40px'}} >NewMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.filter((element)=> element.title !== "[Removed]" && element.description !== "[Removed]").map((element)=>{
          return <div className="col-md-4" key={element.url?element.url:"/"}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://cdn.mos.cms.futurecdn.net/mLsWb5UBE2sX9AkoKSrCri-1200-80.jpg"} newsUrl={element.url?element.url:"/"} />
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelPreviousClick}> &larr;Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
