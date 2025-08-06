import './LoadingSpinner.css'

function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  )
}

export default LoadingSpinner