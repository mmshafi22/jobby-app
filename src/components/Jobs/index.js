import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiLoadingStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: [],
    profileLoadingStatus: apiLoadingStatus.initial,
    jobsLoadingStatus: apiLoadingStatus.initial,
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobsLoadingStatus: apiLoadingStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, minimumPackage, searchInput} = this.state
    const customTypes = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${customTypes}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsLoadingStatus: apiLoadingStatus.success,
        jobsList: formattedData,
      })
    } else {
      this.setState({jobsLoadingStatus: apiLoadingStatus.failure})
    }
  }

  getProfile = async () => {
    this.setState({profileLoadingStatus: apiLoadingStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const updatedProfile = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileLoadingStatus: apiLoadingStatus.success,
        profileDetails: updatedProfile,
      })
    } else {
      this.setState({profileLoadingStatus: apiLoadingStatus.failure})
    }
  }

  retryProfile = () => {
    this.getProfile()
  }

  retryJobs = () => {
    this.getJobs()
  }

  changeEmploymentType = type => {
    const {employmentType} = this.state
    const isPresent = employmentType.find(each => each === type)
    if (isPresent !== undefined) {
      const filtered = employmentType.filter(item => item !== isPresent)
      this.setState({employmentType: filtered}, this.getJobs)
    } else {
      this.setState(
        prev => ({employmentType: [...prev.employmentType, type]}),
        this.getJobs,
      )
    }
  }

  changeSalaryRange = minimumPackage => {
    this.setState({minimumPackage}, this.getJobs)
  }

  renderLoadingPage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.setState({searchInput: ''})
    this.getJobs()
  }

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-card-list-container">
        {jobsList.map(eachJob => (
          <JobCard cardDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobCards = () => {
    const {jobsList} = this.state
    const isEmpty = jobsList.length > 0
    if (isEmpty) {
      return this.renderJobs()
    }
    return this.renderNoJobsFailure()
  }

  renderProfilePage = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderRetryButton = () => (
    <div className="retry-btn-container">
      <button type="button" className="btn-retry" onClick={this.retryProfile}>
        Retry
      </button>
    </div>
  )

  renderAllProfilePages = () => {
    const {profileLoadingStatus} = this.state
    switch (profileLoadingStatus) {
      case apiLoadingStatus.success:
        return this.renderProfilePage()
      case apiLoadingStatus.inProgress:
        return this.renderLoadingPage()
      case apiLoadingStatus.failure:
        return this.renderRetryButton()
      default:
        return null
    }
  }

  renderPageFailure = () => (
    <div className="page-failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="btn-retry" onClick={this.retryJobs}>
        Retry
      </button>
    </div>
  )

  renderNoJobsFailure = () => (
    <div className="page-failed-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderAllJobsCard = () => {
    const {jobsLoadingStatus} = this.state
    switch (jobsLoadingStatus) {
      case apiLoadingStatus.success:
        return this.renderJobCards()
      case apiLoadingStatus.failure:
        return this.renderPageFailure()
      case apiLoadingStatus.inProgress:
        return this.renderLoadingPage()
      default:
        return null
    }
  }

  render() {
    const {searchInput, minimumPackage} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="profile-input-container">
            <div className="search-container-sm">
              <input
                type="search"
                placeholder="Search"
                className="input-sm"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onClick={this.onClickSearch}
              />
              <button
                type="button"
                className="btn-icon-search"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllProfilePages()}
            <hr />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              minimumPackage={minimumPackage}
            />
          </div>
          <div className="jobs-details-container">
            <div className="search-container-lg">
              <input
                type="search"
                placeholder="Search"
                className="input-sm"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="btn-icon-search"
                onClick={this.onClickSearch}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobsCard()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
