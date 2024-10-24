import React from 'react'

import { Post } from '@/types/post'
import { SectionIntro } from '../../SectionIntro'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { fetchPosts } from '@/request/fetch'
import PostCard1 from '../Posts/PostCard/PostCard1'
import PostCard2 from '../Posts/PostCard/PostCard2'
import { PageIntro } from '@/types/global'
import FeaturesSection1 from './FeaturesSection/FeaturesSection1'
import { ArrowBigUpDashIcon, CloudFog, FingerprintIcon } from 'lucide-react'
import { LockClosedIcon } from '@radix-ui/react-icons'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

interface BlogProps {
  featuresSection: any
  // featuresSection: { sectionIntro: PageIntro } & { posts: Post[] }
  designType: Number
}

interface RenderContentProps {
  // clients: Client[]
  sectionIntro: PageIntro
  designType?: Number
}

const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: ArrowBigUpDashIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowBigUpDashIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerprintIcon,
  },
]

const RenderContent: React.FC<RenderContentProps> = ({
  // clients,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* <SectionIntro {...sectionIntro} /> */}
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {sectionIntro?.eyebrow}
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                {sectionIntro?.title}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <BasicMarkdown>{sectionIntro?.content}</BasicMarkdown>
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"></div>
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )
  }
}

const FeaturesSection: React.FC<BlogProps> = async ({
  featuresSection,
  designType,
}) => {
  let posts: Post[] | null = null

  try {
    posts = await fetchPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  }

  console.log(featuresSection, 'featuresSection')

  return (
    <>
      <RenderContent
        // clients={
        //   referenceSection.clients.length > 0
        //     ? referenceSection.clients
        //     : clients || []
        // }
        sectionIntro={featuresSection.sectionIntro}
        designType={designType}
      />
    </>
  )
}

export default FeaturesSection
