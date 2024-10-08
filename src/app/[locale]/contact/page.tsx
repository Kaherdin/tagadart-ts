import { type Metadata } from 'next'
import Link from 'next/link'
import { useId } from 'react'

import { Border } from '@/components/ui/Border'
import { Button } from '@/components/elements/Button'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { OfficesSection } from '@/components/sections/Offices'

import { SocialMedia } from '@/components/sections/SocialMedia'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import { PageIntroSections } from '@/components/sections/PageIntro'

import { getTranslations } from 'next-intl/server'
import { fetchContactPage } from '@/request/fetch'
import { ContactForm } from '@/components/form/ContactForm'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

async function ContactForm2() {
  const t = await getTranslations('Contact')
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('title')}
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label={t('name')} name="name" autoComplete="name" />
          <TextInput
            label={t('email')}
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label={t('company')}
            name="company"
            autoComplete="organization"
          />
          <TextInput
            label={t('phone')}
            type="tel"
            name="phone"
            autoComplete="tel"
          />
          <TextInput label={t('message')} name="message" />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">
                {t('budget')}
              </legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput
                  label={t('budget_label01')}
                  name="budget"
                  value="5"
                />
                <RadioInput
                  label={t('budget_label02')}
                  name="budget"
                  value="10"
                />
                <RadioInput
                  label={t('budget_label03')}
                  name="budget"
                  value="50"
                />
                <RadioInput
                  label={t('budget_label04')}
                  name="budget"
                  value="100"
                />
              </div>
            </fieldset>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          {t('button_contact')}
        </Button>
      </form>
    </FadeIn>
  )
}

async function ContactDetails(offices: any) {
  const t = await getTranslations('Contact')

  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {t('offices')}
      </h2>
      {/* <p className="mt-6 text-base text-neutral-600">
        Prefer doing things in person? We don’t but we have to list our
        addresses here for legal reasons.
      </p> */}

      <OfficesSection
        offices={offices.offices}
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
      />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('email_us')}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Support', 'support@tagadart.ch'],
            ['John', 'john@tagadart.ch'],
            ['Aurélien', 'aurelien@tagadart.ch'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Let’s work together. We can’t wait to hear from you.',
}

export default async function Contact() {
  let contactData

  try {
    contactData = await fetchContactPage()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, offices } = contactData || ''

  return (
    <>
      <PageIntroSections {...pageIntro} />
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails offices={offices} />
        </div>
      </Container>
    </>
  )
}
