// app/[locale]/services/[id]/page.tsx
import type { Metadata } from 'next'
import { Service } from '@/types/service'
import { fetchService } from '@/request/fetch'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'
import { PageIntroSections } from '@/components/sections/PageIntro'
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchService(params.id)
  return generatePageMetadata({
    data: service,
    type: 'service',
    id: params.id,
  })
}

type Props = {
  params: {
    id: string
    locale: string
  }
}

async function getService(id: string) {
  const service = await fetchService(id)
  if (!service) return null
  return service
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.id)

  if (!service) {
    return { title: 'Service not found' }
  }

  return {
    title: `${service.pageIntro.title} - Services - Tagadart`,
    description: service.pageIntro.content,
    openGraph: {
      title: service.pageIntro.title,
      description: service.pageIntro.content,
      type: 'website',
      images: service.pageIntro?.cover?.url
        ? [
            {
              url: service.pageIntro.cover.url,
              width: 800,
              height: 600,
              alt: service.pageIntro.title,
            },
          ]
        : [],
    },
  }
}

export default async function ViewServicePage({ params: { id } }: Props) {
  const [service, t] = await Promise.all([
    getService(id),
    getTranslations('Service'),
  ])

  if (!service) {
    notFound()
  }

  const contentSections = service?.structure

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <PageIntroSections
                showCover={false}
                centered
                {...service.pageIntro}
              />
            </header>
          </FadeIn>
          <FadeIn
            className="[&>*]:mx-auto [&>*]:max-w-5xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0"
            key={id}
            style={{ opacity: 1, transform: 'none' }}
          >
            <div>
              {contentSections?.map((section: any) =>
                componentResolver({ section, designType: 1 }),
              )}
            </div>
          </FadeIn>
          {/* <FadeIn className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
            {service.content && (
              <div>
                <h2 className="text-xl">{t('content')}</h2>
                <BasicMarkdown>{service.content}</BasicMarkdown>
              </div>
            )}
          </FadeIn> */}
        </div>
      </Border>
    </article>
  )
}
