import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white min-h-screen flex items-center flex-col  justify-center  py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg max-w-3xl p-8 border border-gray-200">
        <h2 className=" text-4xl md:text-5xl  lg:text-6xl text-center font-bold text-gray-700 mb-10">
          Our Mission
        </h2>
        <p className="md:px-10 lg:px-16 ">
          At QuickBGRemove, our mission is to make image editing simple,
          accessible, and efficient for everyone. We strive to provide an
          easy-to-use, high-quality background removal tool that helps users
          quickly achieve professional results without the need for complex
          software or technical skills. Our goal is to empower individuals,
          businesses, and creatives to enhance their visual content
          effortlessly, saving time and resources. We are dedicated to
          continuously improving our service to meet the evolving needs of our
          users, ensuring a seamless and reliable experience every time.
        </p>
      </div>
      <Link
        className="rounded bg-indigo-600 text-center cursor-pointer text-white p-3 mt-10 mx-auto  hover:bg-indigo-800"
        to={"/"}
      >
        Try Image Backround Remover
      </Link>
    </div>
  );
};

export default About;
