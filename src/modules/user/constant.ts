export const status = [
  { id: '0', value: '', name: 'Any status' },
  { id: '1', value: 'E', name: 'Enable' },
  { id: '2', value: 'D', name: 'Disable' },
  { id: '3', value: 'U', name: 'Unapproved vendor' },
];

export const data_type = [
  { id: '1', value: 'R', name: 'Register' },
  { id: '2', value: 'L', name: 'Last logged in' },
];

export const titleAccessForm = [
  { title: 'Access level', require: true },
  { title: 'Membership', require: false },
  { title: 'Require to change password on next log in', require: false },
];

export const titleAuthForm = [
  { title: 'First Name', require: true },
  { title: 'Last Name', require: true },
  { title: 'Email', require: true },
  { title: 'Password', require: true },
  { title: 'Confirm password', require: true },
  { title: 'Type', require: true },
  { title: 'PaymentRails ID', require: false },
];

export const columns = [
  { id: 'vendor', headerName: 'Login/Email', canSort: true },
  { id: 'lastName', headerName: 'Name', canSort: true },
  { id: 'access_level', headerName: 'Access level', canSort: true },
  { id: 'products', headerName: 'Products', canSort: false },
  { id: 'orders', headerName: 'Orders', canSort: false },
  { id: 'wishlist', headerName: 'Wishlist', canSort: false },
  { id: 'created', headerName: 'Created', canSort: true },
  { id: 'last_login', headerName: 'Last Login', canSort: true },
  { id: 'btn', headerName: '', canSort: false },
];

export const options = [
  //   { id: '0', name: 'All membership' },
  { id: '1', name: 'Membership' },
  { id: '2', name: 'Pending membership' },
];
