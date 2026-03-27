import "../css/SplashLoader.css";

const SplashLoader = () => {
  return (
    <div className="splash-loader-container">
      <div className="splash-content">
        <h1 className="splash-logo"><span>Cine</span>Vault</h1>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashLoader;
