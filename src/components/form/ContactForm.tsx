import { Checkbox } from '@/components/form/Checkbox'
import { FormikDropdown } from '@/components/form/FormikDropdown'
import { TextArea } from '@/components/form/TextArea'
import { TextField } from '@/components/form/TextField'
import { Button } from '@/components/shared/Button'
import clsx from 'clsx'
import { Field, Form, Formik, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Transition } from '@headlessui/react'

const isSmtpTest = !(import.meta.env.PUBLIC_SMTP_VERSION === 'production')

const submit = async (data) => {
  console.log('submit', data)
  // const url = `${window.location.origin}/functions/send-contact-emails`
  const url = `${window.location.origin}/.netlify/functions/send-contact-emails`

  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}

type ContactFormProps = {
  className?: string
  language: string
  preferredLanguage?: string
  locale?: string
  submitLabel: string
  privacyText: string
  successText: string
  emailInvalidText: string
  emailRequiredText: string
  messageRequiredText: string
  submittingMessage: string
  nameLabel: string
  emailLabel: string
  phoneLabel: string
  postalCodeLabel: string
  messageLabel: string
  occupationalGroupLabel: string
  originalSourceFirstPersonLabel: string
  appointmentLabel: string
  newsletterLabel: string
  occupationalGroupOptionArchitect: string
  occupationalGroupOptionCommercialBuilder: string
  occupationalGroupOptionPrivateBuilder: string
  occupationalGroupOptionLocksmithMetalworkers: string
  occupationalGroupOptionOther: string
  originalSourceFirstPersonOptionInternetSearch: string
  originalSourceFirstPersonOptionSocialMedia: string
  originalSourceFirstPersonOptionRecommendation: string
  originalSourceFirstPersonOptionEvent: string
  originalSourceFirstPersonOptionPress: string
  originalSourceFirstPersonOptionOther: string
}

const ContactFormContent = (props) => {
  const { setSubmitted } = props
  const formik = useFormikContext()
  const { resetForm } = formik

  useEffect(() => {
    const targetNode = document.getElementById('contact-dialog')
    if (!targetNode) return

    const config = { attributes: true }
    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'style') {
            if (targetNode.style.display === 'none') {
              resetForm()
              setSubmitted(false)
            }
          }
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
  }, [])

  return <div>{props.children}</div>
}

export function ContactForm(props: ContactFormProps) {
  const {
    submitLabel,
    privacyText,
    successText,
    emailInvalidText,
    emailRequiredText,
    messageRequiredText,
    submittingMessage,
    nameLabel,
    emailLabel,
    phoneLabel,
    postalCodeLabel,
    messageLabel,
    occupationalGroupLabel,
    originalSourceFirstPersonLabel,
    appointmentLabel,
    newsletterLabel,
    occupationalGroupOptionArchitect,
    occupationalGroupOptionCommercialBuilder,
    occupationalGroupOptionPrivateBuilder,
    occupationalGroupOptionLocksmithMetalworkers,
    occupationalGroupOptionOther,
    originalSourceFirstPersonOptionInternetSearch,
    originalSourceFirstPersonOptionSocialMedia,
    originalSourceFirstPersonOptionRecommendation,
    originalSourceFirstPersonOptionEvent,
    originalSourceFirstPersonOptionPress,
    originalSourceFirstPersonOptionOther,
  } = props
  const handleSubmit = async (values, { setSubmitting }) => {
    setFormData(values)
    const result = await submit({
      ...values,
      language: props.language,
      locale: props.locale,
      preferredLanguage: props.preferredLanguage,
      url: window.location.href,
    })
    const data = await result.json()

    setSubmitMessage({ ...data, status: result.status })
    setSubmitted(true)
    setSubmitting(false)
  }

  const [submitted, setSubmitted] = useState(false)

  const [submitMessage, setSubmitMessage] = useState({
    status: 0,
    previewsUrlNotification: '',
    previewsUrlUser: '',
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postalCode: '',
    occupationalGroup: '',
    originalSourceFirstPerson: '',
    message: '',
    newsletter: false,
    appointment: false,
    privacy: false,
  })

  const schema = Yup.object().shape({
    // name: Yup.string()
    //   .min(2, 'Der Name scheint zu kurz zu sein.')
    //   .max(50, 'Bitte kürzen Sie den Name auf 50 Buchstaben.')
    //   .required('Bitte geben Sie Ihren name ein.'),
    email: Yup.string().email(emailInvalidText).required(emailRequiredText),
    message: Yup.string().required(messageRequiredText),
  })

  const occupationalGroupOptions = [
    {
      label: occupationalGroupLabel,
      value: '',
      disabled: true,
    },
    {
      label: occupationalGroupOptionArchitect,
      value: `architect`,
    },
    {
      label: occupationalGroupOptionCommercialBuilder,
      value: `commercial_builder`,
    },
    {
      label: occupationalGroupOptionPrivateBuilder,
      value: `private_builder`,
    },
    {
      label: occupationalGroupOptionLocksmithMetalworkers,
      value: `locksmith_metalworkers`,
    },
    {
      label: occupationalGroupOptionOther,
      value: `other`,
    },
  ]

  const originalSourceFirstPersonOptions = [
    {
      label: originalSourceFirstPersonLabel,
      value: '',
      disabled: true,
    },
    {
      label: originalSourceFirstPersonOptionInternetSearch,
      value: 'internet_search',
    },
    {
      label: originalSourceFirstPersonOptionSocialMedia,
      value: 'social_media',
    },
    {
      label: originalSourceFirstPersonOptionRecommendation,
      value: 'recommendation',
    },
    {
      label: originalSourceFirstPersonOptionEvent,
      value: 'event',
    },
    {
      label: originalSourceFirstPersonOptionPress,
      value: 'press',
    },
    {
      label: originalSourceFirstPersonOptionOther,
      value: 'other',
    },
  ]

  return (
    <Formik
      initialValues={formData}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <ContactFormContent setSubmitted={setSubmitted}>
          {isSmtpTest && (
            <div className="mb-5 rounded border border-purple-200 bg-purple-50 p-2 font-mono text-sm text-purple-600 shadow">
              <p>
                TESTING ENABLED: Feel free to test, no real e-mails will be
                sent.
              </p>
              {submitted && (
                <ul className="list">
                  <li>
                    <a
                      href={submitMessage.previewsUrlNotification}
                      target="_blank"
                      className="underline"
                    >
                      Preview email to METALLART
                    </a>
                  </li>
                  <li>
                    <a
                      href={submitMessage.previewsUrlUser}
                      target="_blank"
                      className="underline"
                    >
                      Preview email to user
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
          <div className="stack">
            <Transition
              show={!submitted}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0 max-h-0"
              enterTo="opacity-100 max-h-[1000px]"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100 max-h-[1000px]"
              leaveTo="opacity-0 max-h-0"
            >
              <Form
                className={clsx('transition-all', submitted && 'h-0 opacity-0')}
              >
                <fieldset>
                  <div className="space-y-8">
                    <Field name="name">
                      {(props) => (
                        <TextField
                          label={nameLabel}
                          autoComplete="name"
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name="email">
                      {(props) => (
                        <TextField
                          label={emailLabel}
                          autoComplete="email"
                          type="email"
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name="phone">
                      {(props) => (
                        <TextField
                          label={phoneLabel}
                          autocomplete="tel"
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name="postalCode">
                      {(props) => (
                        <TextField
                          label={postalCodeLabel}
                          autocomplete="postal-code"
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name="message">
                      {(props) => <TextArea label={messageLabel} {...props} />}
                    </Field>
                    <FormikDropdown
                      name="occupationalGroup"
                      options={occupationalGroupOptions}
                      label={occupationalGroupLabel}
                    ></FormikDropdown>
                    <FormikDropdown
                      name="originalSourceFirstPerson"
                      options={originalSourceFirstPersonOptions}
                      label={originalSourceFirstPersonLabel}
                    ></FormikDropdown>
                    <Field name="appointment">
                      {(props) => (
                        <Checkbox label={appointmentLabel} {...props} />
                      )}
                    </Field>
                    <Field name="newsletter">
                      {(props) => (
                        <Checkbox label={newsletterLabel} {...props} />
                      )}
                    </Field>
                  </div>
                </fieldset>
                <div className="text-10 mt-8 leading-150 md:text-12">
                  {privacyText}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button
                    as="button"
                    type="submit"
                    color="white"
                    label={submitLabel}
                    disabled={isSubmitting}
                  ></Button>
                </div>
                {isSubmitting && <div>{submittingMessage}</div>}
              </Form>
            </Transition>
            <Transition
              show={submitted}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <p className="text-24 leading-140 lg:text-36">{successText}</p>
            </Transition>
          </div>
        </ContactFormContent>
      )}
    </Formik>
  )
}
