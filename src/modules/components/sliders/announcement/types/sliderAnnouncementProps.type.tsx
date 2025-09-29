type Slide = {
  id: number;
  imageUrl: string;
  link: string;
}

export type SliderProps = {
  slides: Slide[];
  className?: string;
}