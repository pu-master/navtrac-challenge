import { IPayload, IInputSectionDef } from './definitions'

export function validate (sectionList: IInputSectionDef[], payload: IPayload): string {
  for (let section of sectionList) {
    for (let input of section.inputList) {
      // We assume that all fields are required.
      if (typeof payload[input.name] === 'undefined'
        || payload[input.name] === '') {
        return `"${input.label}" is required.`
      }

      // Validate the phone number format.
      const regEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      if (input.type === 'tel' && !regEx.test(payload[input.name])) {
        return `"${input.label}" accepts phone numbers.`
      }
    }
  }
  return ''
}
