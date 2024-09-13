import React from "react";

const Contact = () => {
  return (
    <>
      <div className="bg-white min-h-screen flex items-center  justify-center  py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg max-w-3xl p-8 border border-gray-200">
          <form
            action=""
            className="flex flex-col gap-4
            w-[75vw] sm:w-auto
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.409739342251!2d72.07790975153831!3d34.35876504278925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38deb14d556a5af5%3A0x5ae7c69f149e9366!2sKatlang%20Primary%20School!5e0!3m2!1sen!2s!4v1726190895047!5m2!1sen!2s"
          referrerpolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
          loading="lazy"
          className="w-full h-[300px]"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
