export interface IProductItem {
  amount: string;
  arrivalDate: string;
  category: string;
  condition: string;
  created: string;
  description: string;
  enabled: string;
  id: string;
  name: string;
  participateSale: string;
  price: string;
  sku: string;
  vendor: string;
  vendorID: string;
  weight: string;
  checked: boolean;
}

export interface IProductParams {
  vendor: string;
  productTitle: string;
  brand: string;
  condition: string;
  sku: string;
  images: any;
  category: string;
  description: any;
  membership: string;
  tax: boolean;
  price: string;
  sale: boolean;
  saledPrice: string;
  arrivalDate: Date | null;
  quantityInStock: string;
  continental: string;
  zone: string;
  metaTags: string;
  metaDesc: string;
  metaKeywords: string;
  productPageTitle: string;
}

export interface IProductDetail {
  arrival_date: string;
  brand_id: string;
  categories: [];
  cleanURL: string;
  code: string;
  condition_id: string;
  description: string;
  enabled: string;
  facebook_marketing_enabled: string;
  google_feed_enabled: string;
  id: string;
  images: [];
  inventory_tracking: string;
  memberships: [];
  meta_desc_type: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
  og_tags: string;
  og_tags_type: string;
  participate_sale: string;
  price: string;
  product_page_title: string;
  quantity: string;
  sale_price: string;
  sale_price_type: string;
  shipping: [];
  sku: string;
  sort_description: string;
  tax_exempt: string;
  vendor_id: string;
  weight: string;
}
