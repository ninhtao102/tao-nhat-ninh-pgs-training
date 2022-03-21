export interface IBrands {
  id: string;
  name: string;
}

export interface ICategories {
  id: string;
  name: string;
  parentId: string;
  path: string;
  pos: string;
}
