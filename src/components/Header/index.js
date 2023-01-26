import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-list-container">
      <Link to="/" className="logo-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="home-jobs-text-links">
        <li>
          <Link to="/" className="text-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="text-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="btn-logout" onClick={onClickLogout}>
        Logout
      </button>
      <ul className="list-icons-container">
        <li>
          <Link to="/" className="icon-link">
            <AiFillHome className="nav-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="icon-link">
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="btn-logout-icon"
            onClick={onClickLogout}
          >
            <FiLogOut className="nav-icon" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
