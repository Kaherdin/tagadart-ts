import type { Metadata } from 'next'
import Clients from '@/components/Clients'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import ProjectCard from '@/components/ProjectCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import { getTranslations } from 'next-intl/server'
import { fetchPosts, fetchProjects, fetchProjectsPage } from '@/request/fetch'
import ProjectsSection from '@/components/sections/ProjectsSection'

export const metadata: Metadata = {
  title: 'Projets - Agence de développement web et mobile en Suisse',
}

export default async function ViewProjectsPage() {
  let projectsPageData = null
  let projects = null

  try {
    projectsPageData = await fetchProjectsPage()
    projects = await fetchProjects()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  console.log(projects, 'projects')

  const { pageIntro, projectsSection } = projectsPageData || ''
  const t = await getTranslations('Project')

  return (
    <>
      {/* Page Introduction */}
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      {/* Projects Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            {t('title')}
          </h2>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          <ProjectsSection
            projectsSection={projectsSection}
            projects={projects}
          />
          {/* {projects &&
            projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))} */}
        </div>

        {/* Clients Section */}
        {/* <div>
          <Clients clients={clientsData} key={projects[0]?.id} />
        </div> */}
      </Container>

      {/* Contact Section */}
      <ContactSection />
    </>
  )
}
