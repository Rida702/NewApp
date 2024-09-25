import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
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
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.page}&pageSize=20`;
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, 
      totalresults : parsedData.totalResults
    })
  }

  handelPreviousClick = async() => {
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page : this.state.page - 1
    })
  }

  handelNextClick = async () => {
    let url_endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c9414ea6183044b38934f41098922bcb&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url_endpoint);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page : this.state.page + 1,
      articles: parsedData.articles
      })
  }

  render() {
    console.log("Render")
    return (
      <div className='container my-3'  >
        <h2>NewMonkey - Top Headlines</h2>
        <div className="row">
        {this.state.articles.filter((element)=> element.title !== "[Removed]" && element.description !== "[Removed]").map((element)=>{
          return <div className="col-md-4" key={element.url?element.url:"/"}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
            imageUrl={element.urlToImage?element.urlToImage:"https://cdn.mos.cms.futurecdn.net/mLsWb5UBE2sX9AkoKSrCri-1200-80.jpg"} newsUrl={element.url?element.url:"/"} />
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelPreviousClick}> &larr;Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / 20)} type="button" className="btn btn-dark" onClick={this.handelNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
