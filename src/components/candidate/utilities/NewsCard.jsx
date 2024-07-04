import React from 'react'
import { LinkedInEmbed } from 'react-social-media-embed';

function NewsCard() {
  return (
    <div>
        <div className='relative max-h-128 flex flex-col mt-14 ml-6 text-gray-700 bg-gray-50 shadow-md bg-clip-border rounded-xl w-80'>
            <div className='text-center mt-2'>
            <p className='text-xl font-bold'><span className='text-blue-600 text-2xl'>SeekSet</span> News</p>
            </div>
            <div className='w-full  '>
                <div className='bg-red-200 mt-4 '>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkedInEmbed 
                      url="https://www.linkedin.com/embed/feed/update/urn:li:share:6898694772484112384"
                      postUrl="https://www.linkedin.com/posts/peterdiamandis_5-discoveries-the-james-webb-telescope-will-activity-6898694773406875648-z-D7"
                      width={325}
                      height={570} 
                    />
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewsCard
