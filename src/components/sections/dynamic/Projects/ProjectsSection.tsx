'use client'
import React from 'react'

import { Project } from '@/types/project'
import { PageIntro, Pagination } from '@/types/global'
import { fetchProjects } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeInStagger } from '@/components/ui/FadeIn'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ProjectCard1 from './ProjectCard/ProjectCard1'
import { Section } from '@/components/ui/Section'
import Fetcher from '@/request/Fetcher'
import PaginationMain from '../../Pagination'
interface ProjectsProps {
  projectsSection: { sectionIntro: PageIntro } & { projects: Project[] } & {
    pagination: Pagination
  }
  designType: number
}

interface RenderContentProps {
  projects: Project[]
  sectionIntro: PageIntro
  designType?: number
}

const RenderContent: React.FC<RenderContentProps> = ({
  projects,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <>
          <SectionIntro {...sectionIntro} />
            {projects.map((project: Project, index: number) => (
                <ProjectCard1 key={index} project={project} index={index}/>
            ))}
        </>
      );
  }
}

const ProjectsSection: React.FC<ProjectsProps> = ({
  projectsSection,
  designType,
}) => {
  const url = '/projects'
  return (
    <Section>
      {projectsSection?.projects ? (
        <div>
          <RenderContent
            projects={projectsSection?.projects}
            sectionIntro={projectsSection.sectionIntro}
            designType={designType}
          />
        </div>
      ) : (
        <Fetcher url={url} paginationMode={projectsSection?.pagination?.value}>
          {({ data, currentPage, totalPages, goToPage }) => (
            <div>
              <RenderContent
                projects={data.data}
                sectionIntro={projectsSection.sectionIntro}
                designType={designType}
              />
              {projectsSection?.pagination?.value === 'off' ? null : (
                <PaginationMain
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                />
              )}
            </div>
          )}
        </Fetcher>
      )}
    </Section>
  )
}

export default ProjectsSection
