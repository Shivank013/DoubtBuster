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

const TagsPage = () => {
  const router = useRouter()
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/expertdash/gettagdata'
        )
        setTags(response.data.tags)
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
    <div className=''>
      <div className='relative'>
        <Image className='absolute top-[7rem] h-[30rem]' src={image3}></Image>
      </div>
      <div className='flex w-[100%] relative justify-center items-center'>
          <div className='w-[50%] flex flex-col gap-5 mt-[8rem]'>
              <p className='p-5 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <Image className='w-[50%]' src={image1}></Image>
          <Image className='absolute top-[14rem] right-[7.5rem]' src={image2}></Image>
      </div>
      
      <h1 className='mt-[4rem] font-bold text-[2rem] text-center'>All Tags</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='mt-8 flex gap-x-2 gap-y-8 flex-wrap'>
          {tags.map((tag, index) => (
            <li className='border rounded bg-white shadow-lg p-4 flex flex-col gap-y-8 ml-7 h-[14rem] w-[24rem]' key={index}>
              <p className='border bg-[#b8acac3e] rounded-2xl font-normal text-[1.2rem] pl-3'>{tag}</p>
              <p className='text-[14px] text-[#666666]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus vitae odio tincidunt malesuada.
              </p>
              {/* <button onClick={() => handleTagClick(tag)}>{tag}</button> */}
              <button className = 'uppercase' onClick={() => handleTagClick(tag)}>View All Questions</button>
            </li>
          ))}
        </ul>
      )}

      <div className='relative'>
          <Image className='absolute top-[-7rem] -z-10' src={image4}></Image>
      </div>
      <div className='flex flex-col'>
            <h1 className='mt-[6.5rem] text-center text-[2rem] text-[#000000c6]'><span className='text-[#444444]'>Key</span> Features</h1>
            <div className='flex gap-3 mt-[3rem] ml-5'>
              <div className='flex flex-col justify-center items-center'>
                <Image src={img1} ></Image>
                <h1 className='mt-5 font-extrabold text-[1.2rem] text-[#444444]'>Most Updated Questions</h1>
                <p className='text-gray-500 text-[13px] text-center'>Get all the new pattern based questions available for practice at the earlies</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <Image className='text-center' src={img2}></Image>
                <h1 className='font-extrabold mt-5 text-[1.2rem] text-[#444444]'>Most Updated Questions</h1>
                <p className='text-gray-500 text-[13px] text-center'>Get all the new pattern based questions available for practice at the earlies</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <Image className='' src={img3}></Image>
                <h1 className='mt-5 font-extrabold text-[1.2rem] text-[#444444]'>Most Updated Questions</h1>
                <p className='text-gray-500 text-[13px] text-center'>Get all the new pattern based questions available for practice at the earlies</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <Image className='' src={img4}></Image>
                <h1 className='mt-5 font-extrabold text-[1.2rem] text-[#444444]'>Most Updated Questions</h1>
                <p className='text-gray-500 text-[13px] text-center'>Get all the new pattern based questions available for practice at the earlies</p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default TagsPage
