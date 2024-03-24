import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import test from './test/page'
import { Router } from 'next/router'

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
    <div>
      <h1>All Tags</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              <button onClick={() => handleTagClick(tag)}>{tag}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TagsPage
