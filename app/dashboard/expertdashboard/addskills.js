"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import test from './test/page'
import { Router } from 'next/router'
import Image from 'next/image'
import image1 from '../../../public/images/bannerbg (2).webp'
import image2 from '../../../public/images/bannerbg (3).webp'
import image3 from '../../../public/images/bannerbg (1).webp'
import image4 from '../../../public/images/section.webp'
import img1 from '../../../public/images/i1.webp'
import img2 from '../../../public/images/i2.webp'
import img3 from '../../../public/images/i3.webp'
import img4 from '../../../public/images/i4.webp'
import { ColorRing } from 'react-loader-spinner'

const TagsPage = () => {
  const router = useRouter()
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          '/api/expertdash/gettagdata'
        )
        setTags(response.data.tags)
        console.log(response.data.tags);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }

    fetchTags()
  }, [])

  const handleTagClick = (tag) => {
    console.log(`Clicked tag: ${tag}`)

    // router.push({
    //   pathname: '/dashboard/expertdashboard/test', // Specify the path of the destination page
    //   query: { tag: tag }, // Pass the tag name as a query parameter
    // })
    console.log(`Clicked tag: ${tag}`)
    const tagDetailsUrl = `/dashboard/expertdashboard/test?tag=${encodeURIComponent(
      tag
    )}`
    window.location.href = tagDetailsUrl
    // Perform your action here, such as navigating to a different page
  }

  return (
    <div className="">
      <div className="relative">
        <Image alt='' className="absolute top-[7rem] h-[30rem]" src={image3}></Image>
      </div>
      <div className="flex w-[100%] relative justify-center items-center">
        <div className="w-[50%] flex flex-col gap-5 mt-[8rem]">
          <p className="p-5 text-center">
          Your ability to effectively address the inquiries and uncertainties of 
          students within your area of expertise is crucial to providing them with 
          the support and guidance they need. To ensure that you possess the necessary
          proficiency and expertise, we require you to undergo a comprehensive 
          proficiency test. This test serves as a means to formally integrate the
          specific skills into your profile, indicating to students that you have
          met the standards of competence and reliability necessary to assist them
          effectively. By completing this test, you not only demonstrate your
          commitment to maintaining a high level of quality in your interactions
          with students but also ensure that you are equipped to provide 
          accurate and reliable assistance in your designated area of expertise.
          </p>
        </div>
        <Image alt='' className="w-[50%]" src={image1}></Image>
        <Image
          alt=''
          className="absolute top-[14rem] right-[7.5rem]"
          src={image2}
        ></Image>
      </div>

      <h1 className="mt-[4rem] font-bold text-[2rem] text-center">All Tags</h1>
      {loading ? (
        <div className=" flex justify-center  items-center h-[100vh]">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
        <ul className="mt-8 flex gap-x-2 gap-y-8 flex-wrap">
          {tags.map((tag, index) => (
            <li
              className="border rounded bg-white shadow-xl p-4 flex flex-col gap-y-8 ml-7 h-[14rem] mb-2 w-[22rem]"
              key={index}
            >
              <p className="border bg-[#b8acac3e] rounded-2xl font-normal text-xl pl-3">
                {tag}
              </p>
              <p className="text-[14px] text-[#666666]">
              Before you can add this skill to your profile, we ask that experts undergo a proficiency test to ensure accuracy and competence.
              </p>
              <button className="uppercase bg-red-500 mx-16 text-white font-semibold rounded-lg py-1" onClick={() => handleTagClick(tag)}>
                Start Test
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className=" -mt-60 relative">
        <Image alt='' className="absolute top-[-7rem] -z-10" src={image4}></Image>
      </div>
      <div className="flex flex-col">
        
      </div>
    </div>
  )
}

export default TagsPage
