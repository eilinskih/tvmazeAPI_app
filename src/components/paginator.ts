export const paginate = (array: any, index: any, size: any) => {
    index = Math.abs(parseInt(index));
    index = index > 0 ? index - 1 : index;
    size = parseInt(size);
    size = size < 1 ? 1 : size;
    return [...(array.filter((value: any, n: any) => {
        return (n >= (index * size)) && (n < ((index+1) * size))
    }))]
}