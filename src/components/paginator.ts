import { IMovieItem } from "./tsInterfaces";

export const paginate = (array: IMovieItem[], index: number, size: number) => {
    index = index > 0 ? index - 1 : index;
    size = size < 1 ? 1 : size;
    return [...(array.filter((value: IMovieItem, n: number) => {
        return (n >= (index * size)) && (n < ((index+1) * size))
    }))]
}