import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import CourseItem from '../CourseItem'
import Header from '../Header'

class AllCourses extends Component {
  state = {coursesList: [], isLoading: true}

  componentDidMount() {
    this.findData()
  }

  findData = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const fetchedData = data.courses.map(eachData => ({
      id: eachData.id,
      logoUrl: eachData.logo_url,
      name: eachData.name,
    }))
    this.setState({coursesList: fetchedData, isLoading: false})
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderCourseItem = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1>Courses</h1>
        <ul className="all-course-list">
          {coursesList.map(eachCCourse => (
            <CourseItem eachCCourse={eachCCourse} key={eachCCourse.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        {isLoading ? this.renderLoadingView() : this.onRenderCourseItem()}
      </div>
    )
  }
}
export default AllCourses
