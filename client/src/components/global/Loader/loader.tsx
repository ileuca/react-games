import "./loader.css";

const Loader = () => {
  return (
    <div id={"loaderContainer"} className="center">
      <div className="loader s50" />
      <div className="loader s100" />
      <div className="loader s150" />
      <div className="loader s200" />
      <div className="loader s250" />
      <div className="loader s300" />
    </div>
  );
};

export default Loader;
