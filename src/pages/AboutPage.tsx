import Card from '../components/shared/Card'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>About this project</h1>
        <p>A React app for leaving a feedback</p>
        <p>
          <Link to='/'>Back to Home Page</Link>
        </p>
      </div>
    </Card>
  )
}

export default AboutPage
