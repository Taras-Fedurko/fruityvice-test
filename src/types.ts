export interface Nutrition {
  carbohydrates: number;
  protein: number;
  fat: number;
  calories: number;
  sugar: number;
}

export interface Fruit {
  id: number;
  name: string;
  family: string;
  genus: string;
  order: string;
  nutritions: Nutrition;
}

export type FilteredFruits = Record<string, Fruit[]>;

export enum FILTER {
  NONE = 'none',
  FAMILY = 'family',
  ORDER = 'order',
  GENUS = 'genus',
}
