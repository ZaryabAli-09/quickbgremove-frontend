import React from "react";

const Contact = () => {
  return (
    <>
      <div className="bg-white min-h-screen flex items-center  justify-center  py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg max-w-3xl p-8 border border-gray-200">
          <form
            action=""
            className="flex flex-col gap-4
          "
          >
            {" "}
            <h2 className=" text-4xl md:text-5xl  lg:text-6xl text-center font-bold text-gray-700 mb-10">
              Got questions? <br /> We'll answer.
            </h2>
            <input
              className=" rounded p-2 border border-gray-200"
              placeholder="Enter your name"
              type="text"
            />
            <input
              className="border p-2 rounded border-gray-200"
              placeholder="Enter your email"
              type="text"
            />
            <textarea
              className="border p-2 border-gray-200 rounded"
              placeholder="Enter your message here"
              cols="5"
              rows="5"
            ></textarea>
            <button className="rounded bg-indigo-600 text-white p-3  hover:bg-indigo-800">
              Submit
            </button>
          </form>
        </div>
      </div>

      <section className="map-container mt-10 p-20 bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194170912925!2d-122.41826768467905!3d37.779276279758175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c9e8b2c0d%3A0x41a3be5396cc1b39!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1659130354851!5m2!1sen!2sus"
          style={{ border: 0 }}
          loading="lazy"
          className="w-full h-[300px]"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
