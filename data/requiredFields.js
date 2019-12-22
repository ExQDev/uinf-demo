export default [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    veeValidate: { required: true, regex: '^[a-z][-_a-z0-9]*[a-z0-9]$' }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    veeValidate: { required: true, min: 6 },
    addition: { 'password-reveal': true }
  },
  {
    name: 'finPassword',
    label: 'Finance Password',
    type: 'password',
    veeValidate: { required: true, min: 6 },
    addition: { 'password-reveal': true }
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
  {
    name: 'country',
    label: 'Country',
    type: 'text',
    veeValidate: { required: true, regex: '^[a-zA-Z][a-zA-Z]$' }
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    veeValidate: 'required|phone'
  },
  {
    name: 'skype',
    label: 'Skype',
    type: 'text',
    veeValidate: { regex: '^[a-z][a-z0-9-_]*$' }
  }
]
