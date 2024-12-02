/* eslint-disable import/no-anonymous-default-export */
export default () => {
    /* eslint-disable-next-line no-restricted-globals */
    self.addEventListener('message', e => {

        if (!e) return;

        const data = e.data.sortedData;
        const sortOrder = e.data.sortedOrder;
        const sortedColumn = e.data.ColumnName;
        const extractSortableValue = (value:any) => {
            if (value instanceof Date) {
                return value;
            } else if (typeof value === 'number') {
                return value;
            } else {
                return typeof value === 'string' ? value.toLowerCase()?.trim() : value?.toString().toLowerCase()?.trim();
            }
        };

        if (data) {
            const sortedData = data.sort((a:any, b:any) => {
                const valueA = extractSortableValue(a[sortedColumn]);
                const valueB = extractSortableValue(b[sortedColumn]);

                if (valueA == null && valueB == null) {
                    return 0;
                } else if (valueA == null) {
                    return sortOrder === 'asc' ? -1 : 1;
                } else if (valueB == null) {
                    return sortOrder === 'asc' ? 1 : -1;
                }

                if (sortOrder === 'asc') {
                    return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                } else {
                    return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
                }
            });

            postMessage(sortedData);
        }

        /* eslint-disable-next-line no-restricted-globals */

    })
}