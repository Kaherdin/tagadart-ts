import React from 'react'

interface FeatureProps {
  title: string
  icon: React.ComponentType<any>
  description: string
  href: string
  eyebrow: string
  pageIntro: { title: string; content: string } // Added pageIntro property
}

interface FeatureCardProps {
  featurecards: FeatureProps
}

const FeatureCardProps: React.FC<FeatureCardProps> = ({ featurecards }) => {
  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div key={featurecards.pageIntro?.title} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                {/* <feature.icon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-indigo-600"
                /> */}
                {featurecards.pageIntro?.title || 'Default Title'}{' '}
                {/* Added optional chaining and default value */}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  {featurecards.pageIntro?.content || 'Default Content'}
                </p>
                <p className="mt-6">
                  <a
                    href={featurecards.href}
                    className="text-sm font-semibold leading-6 text-indigo-600"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureCardProps