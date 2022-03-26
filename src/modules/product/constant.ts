export const stockStatus = [
  { id: 'all', name: 'Any stock status' },
  { id: 'in', name: 'In stock' },
  { id: 'low', name: 'Low stock' },
  { id: 'out', name: 'SOLD' },
];
export const availability = [
  { id: 'all', name: 'Any availability status' },
  { id: 'all', name: 'Only enabled' },
  { id: 'all', name: 'Only disabled' },
];

export const titleAddProductForm = [
  { title: 'Vendor', require: true, paddingValue: '1vh' },
  { title: 'Product Title', require: true, paddingValue: '2vh' },
  { title: 'Brand', require: true, paddingValue: '3vh' },
  { title: 'Condition', require: true, paddingValue: '3vh' },
  { title: 'SKU', require: false, paddingValue: '3vh' },
  { title: 'Images', require: true, paddingValue: '3vh' },
  { title: 'Category', require: true, paddingValue: '10vh' },
  { title: 'Description', require: true, paddingValue: '3vh' },
  { title: 'Available for sale', require: false, paddingValue: '29vh' },
];

export const titleMarketingForm = [
  { title: 'Open Graph meta tags', paddingValue: '1vh' },
  { title: 'Meta description', paddingValue: '2vh' },
  { title: 'Meta keywords', paddingValue: '2vh' },
  { title: 'Product page title', paddingValue: '2vh' },
  { title: 'Add to Facebook product feed', paddingValue: '3vh' },
  { title: 'Add to Google product feed', paddingValue: '2vh' },
];

export const titlePriceForm = [
  { title: 'Memberships', require: false },
  { title: 'Tax class', require: false },
  { title: 'Price', require: true },
  { title: 'Arrival date', require: false },
  { title: 'Quantity in stock', require: true },
];

export const columns = [
  { id: 'sku', headerName: 'SKU', canSort: true },
  { id: 'name', headerName: 'Name', canSort: true },
  { id: 'category', headerName: 'Category', canSort: false },
  { id: 'price', headerName: 'Price', canSort: true },
  { id: 'amount', headerName: 'In stock', canSort: true },
  { id: 'vendor', headerName: 'Vendor', canSort: true },
  { id: 'arrivalDate', headerName: 'Arrival Date', canSort: true },
  { id: 'btn', headerName: '', canSort: false },
];
