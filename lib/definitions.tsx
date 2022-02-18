export interface IPayload {
  [key: string]: string;
}

interface IInputFieldDef {
  name: string;
  label: string;
  type?: string;
}

export interface IInputSectionDef {
  key: string;
  name: string;
  inputList: IInputFieldDef[];
}

// Define sections and input fields to render.
export const SECTION_CONTACT = 'contact'
export const SECTION_HAULING = 'hauling'

export const sectionList: IInputSectionDef[] = [
  {
    key: SECTION_CONTACT,
    name: 'Contact Information',
    inputList: [
      { name: 'name', label: 'Name' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
      { name: 'company', label: 'Hauling Company' },
    ],
  },
  {
    key: SECTION_HAULING,
    name: 'Hauling Information',
    inputList: [
      { name: 'loadNumber', label: 'Load/Booking Number' },
      { name: 'customerName', label: 'Customer Name' },
      { name: 'containerNumber', label: 'Container Number' },
    ],
  },
]
