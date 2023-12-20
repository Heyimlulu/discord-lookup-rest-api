export const convertColor = (color: number) => {
    if (color) {
        const hex = color.toString(16);
        return `#${hex.slice(0, 6)}`;
    }

    return null;
}