export default [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    veeValidate: { required: true, regex: '^[a-z][-_a-z0-9]*[a-z0-9]$' }
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    veeValidate: 'required|email'
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    veeValidate: { required: true, regex: '^[a-z0-9A-Z ]*$' }
  },
  {
    name: 'secondName',
    label: 'Second Name',
    type: 'text',
    veeValidate: { required: true, regex: '^[a-z0-9A-Z ]*$' }
  },
  { name: 'birthday', label: 'Birthday', type: 'date' },
  { name: 'state', label: 'State', type: 'text' },
  {
    name: 'country',
    label: 'Country',
    type: 'text',
    veeValidate: { required: true, regex: '^[a-zA-Z][a-zA-Z]$' }
  },
  {
    name: 'phoneNumber',
    label: 'Phone',
    type: 'text',
    veeValidate: 'required|phone'
  },
  {
    name: 'phoneNumber2',
    label: 'Phone number 2',
    type: 'text',
    veeValidate: 'phone'
  },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'zipCode', label: 'Zip Code', type: 'text' },
  {
    name: 'skype',
    label: 'Skype',
    type: 'text',
    veeValidate: { regex: '^[a-z][a-z0-9-_]*$' }
  },
  { name: 'site', label: 'Site', type: 'text' },
  { name: 'odnoklassniki', label: 'Odnoklassniki', type: 'text' },
  { name: 'vk', label: 'VK', type: 'text' },
  { name: 'fb', label: 'Facebook', type: 'text' },
  { name: 'youtube', label: 'YouTube', type: 'text' },
  { name: 'autoExtensionBS', label: 'autoExtentionBS(?)', type: 'checkbox' },
  { name: 'showMobile', label: 'Show mobile', type: 'checkbox' },
  { name: 'showEmail', label: 'Show email', type: 'checkbox' },
  { name: 'showName', label: 'Show name', type: 'checkbox' },
  { name: 'deliveryEMail', label: 'Delivery Email', type: 'checkbox' },
  { name: 'deliverySMS', label: 'Delivery SMS', type: 'checkbox' }
]
