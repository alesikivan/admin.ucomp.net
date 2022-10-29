import images from '../../assets/images/imgs'

import '../../assets/styles/css/particles/feedback.css'

function Feedback({ message = '', callback = () => {} }) {
  return <div className="feedback-block">
    <img src={images.success} alt="succes" />
    
    <h3 className='title'>Success</h3>
    
    <span className='message'>{message}</span>
    
    <button onClick={callback}>One more feedback</button>
  </div>
}

export default Feedback
