import { Rating } from './rating';

export interface Journalist {
  journalistId: number;
  name: string;
  photoUrl: string;
  description: string;
  rating: Rating;
}
