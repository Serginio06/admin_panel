export default function dataSet(props: any): object {
    const dataSet: object = {};
    Object.keys(props).filter((value: string): void => {
        if (/data-\S+/gi.test(value)) {
            dataSet[value] = props[value];
        }
    });
    return dataSet;
}
