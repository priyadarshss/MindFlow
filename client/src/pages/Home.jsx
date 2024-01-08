import React, { useEffect, useState } from 'react'

import { Card, FormField, Loader } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }

  return (
    <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [posts, setPosts] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)

    try {
      const response = await fetch(
        'https://mindflow.onrender.com/api/v1/post',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const result = await response.json()
        setAllPosts(result.data.reverse())
        setPosts(true)
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!posts) {
      const intervalId = setInterval(() => {
        fetchPosts()
      }, 2000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [posts, fetchPosts])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        )
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div className='flex justify-center items-center'>
        <div>
          <h1 className='font-extrabold text-[#222328] text-[32px] flex justify-center items-center text-center'>
            The Community Showcase
          </h1>
          <p className='flex justify-center items-center mt-2 text-[#666e75] text-[16px] text-center'>
            Explore a compilation of creative and visually impressive pictures
            produced by DALL·E
          </p>
        </div>
      </div>
      <div className='mt-16'>
        <FormField
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for{' '}
                <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No search results found'
                />
              ) : !searchText && posts ? (
                <RenderCards data={allPosts} title='No posts found' />
              ): null}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
