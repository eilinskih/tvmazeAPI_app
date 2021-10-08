import { IMovieItem } from "./tsInterfaces";

export const paginate = (array: IMovieItem[], index: number, size: number) => {
    return array.slice((index - 1) * size, index * size);
};
