import { fetchAxiosAPI } from '@/request/request'
import { type Metadata } from 'next'

import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'

import Culture from '@/components/Culture'
import Team from '@/components/Team'
import { RestQueryParams } from '@/types/global'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  const populateAbout = [
    'pageIntro',
    'cultureSection',
    'cultureSection.values',
    'teamSection',
    'teamSection.members',
    'teamSection.members.avatar',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateAbout,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
  
  let aboutData;
  try {
    aboutData = await fetchAxiosAPI('about-us-page', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load about data:', error)
    return <div>Failed to load data</div>
  }
  const { pageIntro, cultureSection, teamSection } = aboutData?.data

  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Culture culturecard={cultureSection} />

      <Team teamCard={teamSection} />
      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        // intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      /> */}

      <ContactSection />
    </>
  )
}
