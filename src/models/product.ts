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
  arrival_date: Date | null;
  brand: string;
  brand_id: string;
  categories: [];
  code: string;
  continental: string;
  condition_id: string;
  cleanURL: string;
  enabled: string;
  description: any;
  facebook_marketing_enabled: string;
  google_feed_enabled: string;
  images: any;
  // images: [];
  inventory_tracking: string;
  memberships: []
  meta_desc_type: string;
  meta_description: string;
  meta_keywords: string;
  name: string
  og_tags: string;
  og_tags_type: string;
  participate_sale: string;
  price: string;
  product_page_title: string;
  quantity: string;
  sale: boolean;
  sale_price: string;
  sale_price_type: string;
  sku: string;
  shipping_to_zone: [];
  sort_description: string;
  tax_exempt: string;
  vendor_id: string;
  zone: string;
}

