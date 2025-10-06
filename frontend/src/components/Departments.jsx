import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      blurb: "Growth-focused care for every milestone."
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      blurb: "Mobility restored with precision surgery."
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      blurb: "Heart health backed by real-time telemetry."
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      blurb: "Neuro navigation for delicate interventions."
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      blurb: "Holistic cancer journeys with genomic insight."
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      blurb: "Imaging suites with ambient calming tech."
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      blurb: "Rehab studios tailored to your lifestyle."
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      blurb: "Skin science paired with regenerative care."
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      blurb: "Sensory wellness for sound, speech & breath."
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <div className="section-heading">
          <span className="section-eyebrow">Expert teams</span>
          <h2>Explore our speciality studios</h2>
        </div>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="department-card">
                <img src={depart.imageUrl} alt={`${depart.name} department`} />
                <div className="department-overlay">
                  <h3>{depart.name}</h3>
                  <p>{depart.blurb}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
