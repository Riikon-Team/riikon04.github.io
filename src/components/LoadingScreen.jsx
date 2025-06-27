import './LoadingScreen.css';

function LoadingScreen({ progress }) {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h2>Loading...</h2>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}

export default LoadingScreen;
