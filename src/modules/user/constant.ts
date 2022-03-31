export const userStatus = [
  { id: '0', value: undefined, name: 'Any status' },
  { id: '1', value: 'E', name: 'Enable' },
  { id: '2', value: 'D', name: 'Disable' },
  { id: '3', value: 'U', name: 'Unapproved vendor' },
];

export const dataType = [
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

export const titleExtenInfo = [
  { title: 'Orders placed as a buyer' },
  { title: 'Vendor Income' },
  { title: 'Vendor Expense' },
  { title: 'Earning balance' },
  { title: 'Products listed as vendor' },
  { title: 'Joined' },
  { title: 'Last login' },
  { title: 'Language' },
  { title: 'Referer' }
]

export const titleAccessDetail = [
  { title: 'Access level', require: false, mgT: '0vh' },
  { title: 'Account status', require: true, mgT: '0vh' },
  { title: 'Status comment(reason)', require: false, mgT: '0vh' },
  { title: 'Membership', require: false, mgT: '7vh' },
  { title: 'Pending membership', require: false, mgT: '1vh' },
  { title: 'Require to change password on next log in', require: false, mgT: '0vh' },
];