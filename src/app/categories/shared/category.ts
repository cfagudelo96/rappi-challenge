export interface Category {
  id: number;
  name: string;
  sublevels?: Category[];
}
