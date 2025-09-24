import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white min-h-screen flex items-center flex-col  justify-center  py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg max-w-3xl p-8 border border-gray-200 flex flex-col items-center ">
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
          <Link to={"https://zaryab-ali.netlify.app"}>
            <span className="bg-indigo-200 text-black font-bold p-2 relative top-3 opacity-50 hover:scale-110 rounded-lg flex w-fit items-center gap-2">
              ~Zaryab Ali <IoPerson className="text-lg  " />
            </span>
          </Link>
        </div>
        <Link
          className="rounded bg-indigo-600 text-center cursor-pointer text-white p-3 mt-10 mx-auto  hover:bg-indigo-800"
          to={"/"}
        >
          Try Image Backround Remover
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default About;
