export class CreateRecipeDto {
  name!: string;
  category!: string;
  author!: string;
  image?: string;
  description!: string;
  duration!: number;
  servings!: number;
  difficulty!: string;
  ingredients!: string[];
  steps!: string[];
}

export class UpdateRecipeDto {
  name?: string;
  category?: string;
  author?: string;
  image?: string;
  description?: string;
  duration?: number;
  servings?: number;
  difficulty?: string;
  ingredients?: string[];
  steps?: string[];
}
