import React from "react";
import Back from "../common/Back";
import RecentCard from "../home/recent/RecentCard";
import "../home/recent/recent.scss";
import img from "../images/Camera.jpg";

const Camera = () => {
  return (
    <section className="blog-out mb">
      <Back
        name="Cameras"
        title="Get your rental at afforfable price"
        cover={img}
      />

      <div className="container recent">
        <RecentCard show="camera" />
      </div>
    </section>
  );
};

export default Camera;
