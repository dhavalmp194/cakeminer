import React from "react"
import Loader from "react-loader-spinner";

const LoaderComponent = ({loading}) => {
  
  return loading && <div className="sweet-loading">
      <Loader type="Bars" color="#f3bb39" height={80} width={80} />
  </div>
}
export default LoaderComponent