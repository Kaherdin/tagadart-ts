import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './Button'
import { Border } from './Border'
import { formatDate } from '@/lib/formatDate'
import ReactMarkdown from 'react-markdown'
import { PageIntro } from '@/types/global'

interface Author {
  name: string
  role: string
  image: {
    src: string
    alt?: string
  }
}

interface Post {
  id: number
  content: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  pageIntro: PageIntro
}

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { pageIntro, content, id } = post

  return (
    <article>
      <Border className="pt-16">
        <div className="relative lg:-mx-4 lg:flex lg:justify-end">
          <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
            <h2 className="font-display text-2xl font-semibold text-neutral-950">
              <Link href={`/blog/${id}`}>{pageIntro?.title}</Link>
            </h2>
            <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
              <dt className="sr-only">Published</dt>
              <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                {/* <time dateTime={date}>{formatDate(date)}</time> */}
              </dd>
              <dt className="sr-only">Author</dt>
              <dd className="mt-6 flex gap-x-4">
                <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                  {/* <Image
                    src={author.image.src}
                    alt={author.image.alt || ''}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover grayscale"
                  /> */}
                </div>
                {/* <div className="text-sm text-neutral-950">
                  <div className="font-semibold">{author.name}</div>
                  <div>{author.role}</div>
                </div> */}
              </dd>
            </dl>
            <p className="mt-6 max-w-2xl text-base text-neutral-600">
              <ReactMarkdown>{pageIntro.content}</ReactMarkdown>
            </p>
            {/* <Button
              href={href}
              aria-label={`Read more: ${title}`}
              className="mt-8"
            >
              Read more
            </Button> */}
          </div>
        </div>
      </Border>
    </article>
  )
}

export default PostCard