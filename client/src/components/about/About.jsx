import React from "react";

import img from "../images/about.jpg";
import Back from "../common/Back";
import Heading from "../common/Heading";
import "./about.css";

const About = () => {
  return (
    <>
      <section className="about">
        <Back name="About Us" title="About Us - Who We Are?" cover={img} />
        <div className="container flex flex-col gap-20 px-6 my-12 lg:flex-row">
          <div className="w-6/12 left row about-desc">
            <div className="text-left">
              <Heading
                title="About Shutter Scope"
                subtitle="Check out our details and work process"
              />
            </div>

            <p>
              Shutter Scope offers comprehensive rental services for cameras,
              completelight & grips rental, and full postproduction tools
              including color grading, videoediting, Visual effects, and audio
              debugging. Customers can rent their preferred brands of camera,
              lenses, lighting equipment’s, video and films, production
              equipment’s, and much more through our website, likewise
              professional photographers are also available for hiring. The
              suggested system is an entirely online based.{" "}
            </p>
            <p>
              It effectively and efficiently automates manual process well our
              main moto is to solve the gear and equipment-based problems. As
              every clients have specific requirements for every different
              projects so the photographers and videographers requires specific
              and a lot varieties of equipment i.e. professional camera and
              lenses, High quality light equipment and modifiers, well audio is
              another necessary part of every project or films. We have a huge
              varieties of audio tools likewise after every shoot or fields work
              another step of enhancements is postproduction so considering that
              in mind.{" "}
            </p>
          </div>
          
          <div className="w-6/12 right row">
            <img src="./about.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
