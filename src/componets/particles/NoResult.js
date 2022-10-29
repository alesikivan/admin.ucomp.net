import '../../assets/styles/css/particles/no-result.css'

function NoResult({ text = '' }) {
  return <div className='no-result-message'>
    <span>{text}</span>
  </div>
}

export default NoResult