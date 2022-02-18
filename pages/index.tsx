import { FormEvent, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import { IPayload, SECTION_CONTACT, sectionList } from '../lib/definitions'
import { validate } from '../lib/validator'

import InputSection from '../components/InputSection'
import InputField from '../components/InputField'

const Home: NextPage = () => {
  const [activeSection, setActiveSection] = useState(SECTION_CONTACT)
  const [payload, setPayload] = useState<IPayload>({})
  const [message, setMessage] = useState<string>('')

  // Handle user input.
  const handlePayloadChange = (name: string, value: string) => {
    setPayload(Object.assign({}, payload, {
      [name]: value,
    }))
  }

  // Handle form submission.
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setMessage('')

    // Validate user input.
    const error = validate(sectionList, payload)
    if (error) {
      setMessage(error)
      return
    }

    // Call API to submit data.
    const response = await fetch('/api/checkin', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    if (data.success) {
      setMessage('Submitted successfully.')
    }
  }

  // Render sections to input data.
  const renderSections = () => {
    return sectionList.map(section => (
      <InputSection
        key={section.key}
        name={section.name}
        isActive={activeSection === section.key}
        onToggle={() => { setActiveSection(section.key) }}
      >
        {
          section.inputList.map(input => (
            <InputField
              key={input.name}
              name={input.name}
              label={input.label}
              value={payload[input.name] || ''}
              onChange={handlePayloadChange}
            />
          ))
        }
      </InputSection>
    ))
  }

  return (
    <>
      <Head>
        <title>Navtrac - Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} container`}>
        <div className="row">
          <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
            { renderSections() }
            {
              message !== '' && (
                <div className="alert alert-danger">
                  { message }
                </div>
              )
            }
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Home
