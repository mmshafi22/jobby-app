import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {RiShareBoxFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsList: {},
    similarJobsList: [],
    detailsLoadingStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({detailsLoadingStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const obj = fetchedData.job_details
      const jobDetailObj = {
        companyLogoUrl: obj.company_logo_url,
        companyWebsiteUrl: obj.company_website_url,
        employmentType: obj.employment_type,
        id: obj.id,
        jobDescription: obj.job_description,
        skills: obj.skills.map(eachObj => ({
          imageUrl: eachObj.image_url,
          name: eachObj.name,
        })),
        lifeAtCompany: {
          description: obj.life_at_company.description,
          imageUrl: obj.life_at_company.image_url,
        },
        location: obj.location,
        packagePerAnnum: obj.package_per_annum,
        rating: obj.rating,
        title: obj.title,
      }
      const similarJobs = fetchedData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.companyLogoUrl,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetailsList: jobDetailObj,
        similarJobsList: similarJobs,
        detailsLoadingStatus: apiStatus.success,
      })
    } else {
      this.setState({detailsLoadingStatus: apiStatus.failure})
    }
  }

  renderLoaderViewPage = () => (
    <div className="detailed-page-loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessPage = () => {
    const {jobDetailsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsList

    return (
      <div className="detailed-view-container">
        <div className="job-detailed-card">
          <div className="detail-company-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="detail-company-logo"
            />
            <div className="detail-text-container">
              <h1>{title}</h1>
              <div className="detail-rating">
                <AiFillStar className="detail-star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="detail-location-internship-salary-container">
            <div className="detail-location-internship-container">
              <div className="detail-location-internship">
                <MdLocationOn className="detail-location-internship-icon" />
                <p>{location}</p>
              </div>
              <div className="detail-location-internship">
                <BsBriefcaseFill className="detail-location-internship-icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="detail-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-heading-container">
            <h1 className="detail-description-heading">Descrption</h1>
            <a href={companyWebsiteUrl} target="_blanck" className="visit-link">
              <p>Visit</p>
              <RiShareBoxFill className="share-icon" />
            </a>
          </div>
          <p className="detail-description">{jobDescription}</p>
          <h1 className="detail-description-heading">Skills</h1>
          <ul className="skill-list-container">
            {skills.map(eachSkill => (
              <li className="skill">
                <img src={eachSkill.imageUrl} alt={eachSkill.name} />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="detail-description-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="detail-description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
      </div>
    )
  }

  renderAllJobDetailPages = () => {
    const {detailsLoadingStatus} = this.state
    switch (detailsLoadingStatus) {
      case apiStatus.success:
        return this.renderSuccessPage()
      case apiStatus.failure:
        return this.renderFailureViewPage()
      case apiStatus.inProgress:
        return this.renderLoaderViewPage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detail-bg-container">
          {this.renderAllJobDetailPages()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
