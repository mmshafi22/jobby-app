import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobCard = props => {
  const {cardDetails} = props
  const {
    id,
    employmentType,
    companyLogoUrl,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = cardDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="company-detail-container">
          <img src={companyLogoUrl} alt="company logo" />
          <div className="title-container">
            <h1>{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-internship-salary-container">
          <div className="location-internship-container">
            <div className="location-internship">
              <MdLocationOn className="location-internship-icon" />
              <p>{location}</p>
            </div>
            <div className="location-internship">
              <BsBriefcaseFill className="location-internship-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
