import BlogSection from '@/components/sections/dynamic/BlogSection'
import TestimonialSection from '@/components/sections/dynamic/TestimonialSection'
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
        },
      },
    },
  }
  return await fetchAxiosAPI(path, urlParamsObject)
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang)
  if (page?.data?.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const componentResolver = (section: Section & PageIntro) => {
    switch (section.__component) {
      case 'section.blog-section':
        return <BlogSection key={section.id} blogSection={section} />
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
