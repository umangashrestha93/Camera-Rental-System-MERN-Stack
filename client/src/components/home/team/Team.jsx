import React from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";

import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import "./team.css";

const Team = () => {
  return (
    <>
      <section className="team background">
        <div className="container">
          <Heading
            title="Hire the best Photographers in Nepal"
            subtitle="Here we provide the professional photographers with higher skills and experience."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {team.map((val, index) => (
              <div className="box" key={index}>
                <span className="px-3 py-1 mb-3 text-white bg-teal-500 rounded-full">
                  {val.list} Photoshoots
                </span>
                <div className="details">
                  <div className="flex flex-col justify-center mb-3">
                    <img
                      src={val.cover}
                      alt=""
                      className="relative border border-gray-200"
                    />
                    <span className="max-w-xs px-3 py-1 mt-2.5 text-sm text-white rounded-full bg-green-500/90">
                      Verified
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold">{val.name}</h4>
                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center mt-3">
                    <div>
                      <i className="mr-1.5 fa fa-location-dot"></i>
                      <label className="m-0">{val.address}</label>
                    </div>
                    <a
                      title="Call now"
                      href={`tel: ${val.phone}`}
                      className="p-2 ml-auto text-white bg-teal-500 rounded-full"
                    >
                      <PhoneIcon className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
