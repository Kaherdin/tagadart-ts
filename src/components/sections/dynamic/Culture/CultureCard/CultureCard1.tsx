import React from 'react'

import { Culture } from '@/types/global'
import { getTranslations } from 'next-intl/server'
import { GridListItem } from '@/components/ui/GridList'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

interface CultureCardProps {
  culture: Culture
}

const CultureCard1: React.FC<CultureCardProps> = async ({ culture }) => {
  const t = await getTranslations('Culture')

  console.log(culture, 'culture')

  return (
    <>
      <GridListItem key={culture.id} title={culture.title} invert>
        {culture.content && <BasicMarkdown>{culture.content}</BasicMarkdown>}
      </GridListItem>
    </>
  )
}

export default CultureCard1
