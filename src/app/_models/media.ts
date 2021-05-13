import { Rating } from './rating';

export interface Media {
  mediaId: number;
  name: string;
  description: string;
  photoUrl: string;
  rating: Rating;
}
