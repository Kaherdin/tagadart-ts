import type { Metadata } from 'next'

import { PageIntro } from '@/types/global'
import { Container } from '@/components/ui/Container'
import { generateSlugPageMetadata } from '@/lib/seo'
import { componentResolver } from '@/lib/componentResolver'
import { fetchPageBySlug } from '@/request/fetch'

type Props = {
  params: Promise<{
    lang: string
    slug: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const page = await fetchPageBySlug(params.slug, params.lang)

  return generateSlugPageMetadata({ page })
}

export default async function PageRoute(props: Props) {
  const params = await props.params
  const page = await fetchPageBySlug(params.slug, params.lang)

  if (!page || !page.data || page.data.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const contentSections = page?.data[0]?.structure
  return (
    <Container>
      {contentSections?.map((section: Section & PageIntro) =>
        componentResolver({ section, designType: section.designType }),
      )}
    </Container>
  )
}
