import PostsSection from '@/components/sections/dynamic/Posts/PostsSection'
import ProjectsSection from '@/components/sections/dynamic/Projects/ProjectsSection'
import ServicesSection from '@/components/sections/dynamic/Services/ServiceSection'
import TeamsSection from '@/components/sections/dynamic/Teams/TeamsCardSection'
import ReferenceSection from '@/components/sections/dynamic/References/ReferenceSection'

import { fetchAxiosAPI } from '@/request/request'
import { PageIntro } from '@/types/global'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

async function getPageBySlug(slug: string, lang: string) {
  const path = `/pages`
  const urlParamsObject = {
    filters: { slug },
    locale: lang,

    // populate: [
    //   'structure',
    //   'structure.section',
    //   'structure.section.blog-section',
    //   'structure.section.blog-section.posts',
    // ],
    populate: {
      structure: {
        on: {
          'section.blog-section': {
            populate: [
              'sectionIntro',
              'posts',
              'posts.pageIntro',
              'posts.pageIntro.cover',
              'posts.author',
              'posts.author.avatar',
            ],
          },
          'section.projects-section': {
            populate: [
              'sectionIntro',
              'projects',
              'projects.pageIntro',
              'projects.pageIntro.cover',
              'projects.logo',
            ],
          },
          'section.services-section': {
            populate: [
              'sectionIntro',
              'our_services',
              'our_services.pageIntro',
              'our_services.pageIntro.cover',
            ],
          },
          'section.team-section': {
            populate: [
              'sectionIntro',
              'members',
              'members.fullname',
              'members.avatar',
              'members.posts.pageIntro',
            ],
          },
          'section.reference-section': {
            populate: [
              'sectionIntro',
              'clients',
              'clients.name',
              'clients.logo',
            ],
          },
        },
      },
    },
  }
  return await fetchAxiosAPI(path, urlParamsObject)
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang)
  if (!page || !page.data || page.data.length === 0) return null;

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const componentResolver = (section: any) => {
    switch (section.__component) {
      case 'section.blog-section':
        return (
          <PostsSection
            key={section.id}
            postsSection={section}
            designType={2}
          />
        )
      case 'section.projects-section':
        return (
          <ProjectsSection
            key={section.id}
            projectsSection={section}
            designType={2}
          />
        )
      case 'section.services-section':
        return (
          <ServicesSection
            key={section.id}
            servicesSection={section}
            designType={2}
          />
        )
        case 'section.reference-section':
          return (
            <ReferenceSection
              key={section.id}
              referenceSection={section}
              designType={2}
            />
          )
        case 'section.team-section':
          return (
            <TeamsSection
              key={section.id}
              teamsSection={section}
              designType={2}
            />
          )
      // case 'section.testimonials':
      //   return <TestimonialSection key={section.id} avatar={section.avatar} />
      default:
        return null
    }
  }

  const contentSections = page.data[0].structure
  return (
    <>
      {contentSections.map((section: Section & PageIntro) =>
        componentResolver(section),
      )}
    </>
  )
  // const contentSections = page.data[0].attributes.contentSections;
  // return contentSections.map((section: any, index: number) => componentResolver(section, index));
}