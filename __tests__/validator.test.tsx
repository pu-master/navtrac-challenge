import { IPayload, IInputSectionDef } from '../lib/definitions'
import { validate } from '../lib/validator'

const sectionList: IInputSectionDef[] = [
  {
    key: 'test',
    name: 'Contact Information',
    inputList: [
      { name: 'name', label: 'Name' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    ],
  },
]

describe('Validator', () => {
  it('should return an empty string if validation succeeds', () => {
    const payload: IPayload = {
      name: 'John Doe',
      phoneNumber: '123-456-7890',
    }
    const error = validate(sectionList, payload)

    expect(error).toBe('')
  })

  it('should validate required fields', () => {
    let payload: IPayload = {}
    let error = validate(sectionList, payload)

    expect(error).toBe(`"Name" is required.`)

    payload = {
      name: 'John Doe',
    }
    error = validate(sectionList, payload)

    expect(error).toBe(`"Phone Number" is required.`)
  })

  it('should validate phone number fields', () => {
    const payload: IPayload = {
      name: 'John Doe',
      phoneNumber: '123-456-78909999',
    }
    let error = validate(sectionList, payload)
    expect(error).toBe(`"Phone Number" accepts phone numbers.`)

    payload.phoneNumber = 'abc'
    error = validate(sectionList, payload)
    expect(error).toBe(`"Phone Number" accepts phone numbers.`)
  })
})
