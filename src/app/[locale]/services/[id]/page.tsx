import type { Metadata } from 'next'

import { Service } from '@/types/service'
import { fetchService } from '@/request/fetch'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'
import { PageIntroSections } from '@/components/sections/PageIntro'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await fetchService(params.id)
  
  if (!service) {
    return {
      title: 'Service not found'
    }
  }
  return {
    title: `${service.seo.metaTitle} - Tagadart`, // Add your site name
    description: service.seo.metaDescription,
    openGraph: {
      title: service.pageIntro.title,
      description: service.pageIntro.content,
      images: service.pageIntro?.cover?.url ? [
        {
          url: service.pageIntro.cover.url,
          width: 800,
          height: 600,
          alt: service.pageIntro.title,
        }
      ] : [],
    },
    // Optional: Add more metadata
    alternates: {
      canonical: `/services/${params.id}`,
      languages: {
        'en': `/en/services/${params.id}`,
        'fr': `/fr/services/${params.id}`,
      },
    }
  }
}

type Props = {
  params: {
    id: string
  }
}

export default async function ViewServicePage({ params: { id } }: Props) {
  const service: Service = await fetchService(id)
  if (!service) return null
  const { pageIntro } = service || ''

  const t = await getTranslations('Service')

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn key={id}>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <PageIntroSections
                showCover={false}
                centered={true}
                {...pageIntro}
              />
            </header>
          </FadeIn>
          <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
            <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
              <div>
                <h2 className="text-xl">{t('content')}</h2>
                <BasicMarkdown>{service.content}</BasicMarkdown>
              </div>
            </div>
          </FadeIn>
        </div>
      </Border>
    </article>
  )
}
