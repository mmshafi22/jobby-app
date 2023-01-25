import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <h1 className="home-heading">
        Find The Job That
        <br /> Fit Your Life
      </h1>
      <p className="home-description">
        Millions of people are searching for jobs, salary <br />
        information, company reviews. Find the job that fit your
        <br /> abilities and potential.
      </p>
      <Link to="/jobs" className="jobs-page-link">
        <button type="button" className="btn-find-job">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
