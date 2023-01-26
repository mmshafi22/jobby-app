import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarCard = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails
  console.log(companyLogoUrl)

  return (
    <li className="similar-card">
      <div className="similar-company-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div className="similar-text-container">
          <h1>{title}</h1>
          <div className="similar-rating">
            <AiFillStar className="similar-star" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-description">{jobDescription}</p>
      <div className="similar-location-internship-container">
        <div className="similar-location-internship">
          <MdLocationOn className="similar-location-internship-icon" />
          <p>{location}</p>
        </div>
        <div className="similar-location-internship">
          <BsBriefcaseFill className="similar-location-internship-icon" />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarCard
