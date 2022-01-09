export const dateFormatter = () => {
    let date: string;
    let today: any = new Date();

    let dd = ('0' + today.getDate()).slice(-2); // Day
    let mm =  ('0' + (today.getMonth() + 1)).slice(-2); // Month
    let yyyy = today.getFullYear(); // Year

    date = yyyy + '-' + mm + '-' + dd;

    return date;
}
