"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/images/LOGO.png";
import about from "../../public/images/about.png";
import vision from "../../public/images/vision.png";

import adarsh from "../../public/images/adarsh.png";
import deepsen from "../../public/images/deepsen.png";
import shivank from "../../public/images/shivank.png";
import akhilesh from "../../public/images/akhilesh.png";
import gupta from "../../public/images/gupta.png";

const page = () => {
  return ( 
    
    <div className="w-full">
      <nav className="flex z-50 bg-white justify-between items-center top-0 h-[3rem] fixed w-full">
        <div>
          <Image alt="logo" src={logo} className="ml-16 w-[14rem]" />
        </div>
        <div className="mr-16 font-sans flex justify-center items-center">
          {/* <a className="cursor-pointer mr-10 text-l font-semibold rounded-full text-white py-2 px-3 bg-purple-500">
            About
          </a> */}
          <a href="/" className="cursor-pointer mr-7 text-l font-semibold">
            Home
          </a>
          <div>
            <a
              href="/login"
              className="cursor-pointer text-center mr-7 text-l font-semibold py-2 px-3 "
            >
              Login
            </a>
          </div>
          <div>
            <a
              href="/signup"
              className="cursor-pointer text-center text-l font-semibold rounded-full text-white py-2 px-3 bg-purple-500 "
            >
              Signup
            </a>
          </div>
        </div>
      </nav>
    
    {/* about part */}
     
    <div className="h-[110vh] flex flex-col justify-between items-center mx-10 md:mx-20 mt-28 mb-16 pb-10 rounded-3xl">
    <div className="w-full flex justify-center gap-1 mt-10 ">
      <h2 className="text-5xl font-semibold">Welome to</h2><h2 className="text-5xl font-semibold text-purple-600">DoubtBuster</h2>
      </div>
  <div className="flex flex-col items-center md:flex-row md:items-start">
    <div className="md:w-1/2">
      <Image alt="about_image" src={about} className="w-full" />
    </div>
    <div className="mx-5 md:mx-10 p-5 md:w-1/2">
      <p className="text-lg text-gray-800 leading-relaxed">
        Doubt Buster is a revolutionary platform designed to provide unparalleled support in resolving doubts across various domains. Our mission is to empower students and users alike by connecting them with highly educated and verified experts who excel in specific fields. At Doubt Buster, we understand the frustration that comes with unanswered questions and uncertainties. That&aposs why we&aposve assembled a team of experts who are not only knowledgeable but also passionate about helping others succeed.
      </p>
      <p className="text-lg text-gray-800 leading-relaxed mt-4 mb-10">
        Whether you&aposre struggling with complex academic concepts, seeking professional advice, or simply curious about a particular topic, our experts are here to guide you every step of the way. What sets Doubt Buster apart is our rigorous verification process. We ensure that each expert on our platform is not only proficient in their domain but also committed to delivering accurate and reliable information. Say goodbye to confusion and hello to clarity with Doubt Buster. Join us today and experience the difference firsthand!
      </p>
    </div>
  </div>
  
</div>

    

      {/* our vision */}
    <div className="h-[90vh] flex flex-wrap mt-20 items-center mx-10 md:mx-20 mb-16 pt-10 pb-10 rounded-3xl shadow-lg ">
      <div className="w-full flex justify-center gap-1 ">
      <h2 className="text-5xl font-semibold">Our</h2><h2 className="text-5xl font-semibold text-purple-600">Vision</h2>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-end">
      <div className="mx-5 md:mx-10 p-5 md:w-1/2">
        <p className="text-lg text-gray-800 leading-relaxed">Doubt Buster&aposs vision is to become a comprehensive platform for resolving doubts across various domains. 
        Initially focused on computer science, we aim to expand our expertise to encompass multiple fields. 
        Our platform will not only solve doubts but also offer mock interview facilities conducted by top experts. 
        To enhance user experience and attract skilled professionals, we will introduce a payment feature with affordable prices for users. 
        Experts will be compensated based on their ratings, reviews, and the number of problems they solve, ensuring fair and rewarding compensation for their expertise.
        Doubt Buster aims to revolutionize the way people learn, grow, and succeed in their educational and professional journeys.</p>
      </div>
      <div className="md:w-1/2">
      <Image alt="vision_image" src={vision} className="w-full" />
      </div>
    </div>      
</div>
      {/* team section */}
      <div className="h-[62vh] flex flex-wrap justify-evenly mt-28 items-center mx-20 mb-24 pt-10 pb-10 rounded-3xl">
        <div className="w-full flex justify-center gap-1 mt-2 mb-10">
          <h2 className="text-4xl font-semibold">Executive</h2><h2 className="text-4xl font-semibold text-purple-600">Team</h2>
        </div>
        <div className="flex justify-evenly gap-8 items-center mb-6">
          <div className="flex flex-col items-center">
            <Image
              src={adarsh}
              className="w-[10rem] h-[10rem] border-slate-600 rounded-full"
              alt="adarsh"
            />
            <h4 className="font-semibold">Adarsh Kumar</h4>
            <p className="font-semibold text-purple-600">Backend Developer</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={deepsen}
              className="w-[10rem] border rounded-full"
              alt="Deepsen"
            />
            <h4 className="font-semibold">Deepsen</h4>
            <p className="font-semibold text-purple-600">Backend Developer</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={shivank}
              className="w-[10rem] h-[10rem] border rounded-full"
              alt="shivank"
            />
            <h4 className="font-semibold">Shivank Sharma</h4>
            <p className="font-semibold text-purple-600">Product Head</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={akhilesh}
              className="w-[10rem] h-[10rem] border rounded-full"
              alt="akhilesh"
            />
            <h4 className="font-semibold">Akhilesh Pal</h4>
            <p className="font-semibold text-purple-600">Frontend Developer</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={gupta}
              className="w-[10rem] h-[10rem] border rounded-full"
              alt="nikhil"
            />
            <h4 className="font-semibold">Nikhil Gupta</h4>
            <p className="font-semibold text-purple-600 p-2">Frontend Developer</p>
          </div>
        </div>
      </div>

      <footer className="w-full bg-gray-800 text-white p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Section 1 */}
          <div>
            <div className="flex flex-row">
              <span className="ml-1 text-[1.5rem] inline font-sans font-semibold">
                Doubt Buster
              </span>
            </div>
            <div className="p-3">
              Empowering Students, One Doubt at a Time: Your Personalized Path
              to Mastery
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Footer Section 2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul>
              <li>Student LogIn</li>
              <li>Expert LogIn</li>
              <li>Interactive Platform</li>
            </ul>
          </div>

          {/* Footer Section 3 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="w-[screen] h-[1px] bg-white m-6"></div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Doubt Buster. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
  );
};

export default page;