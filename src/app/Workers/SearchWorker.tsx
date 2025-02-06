/* eslint-disable import/no-anonymous-default-export */
export default () => {

    function isValidDate(dateString: string): boolean {
        const dateObject = new Date(dateString);
        return !isNaN(dateObject.getTime());
    }

    function formatDate(inputDate:any) {
        if (inputDate === "" || inputDate === null || inputDate === undefined)
            return "";

        const months = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];

        var dateObj:any;

        if ((typeof inputDate) !== 'object') {
            dateObj = new Date(inputDate);
        }

        const year = dateObj.getFullYear().toString();
        const month = months[dateObj.getMonth()];
        const day = dateObj.getDate().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    }


    function getDotNotation(fileName: string, val:any) {
        if (val?.includes(".xlsx")) {
            return fileName += ".xlsx";
        }
        else if (val?.includes(".csv")) {
            return fileName += ".csv"
        }
        else {
            return fileName
        }
    }


    const DatesColumns = ["SRC_CREATED_DT", "SRC_UPDATED_DT", "INSERT_DATE", "UPLOADED_ON_DT", "SOURCE_UPDATED_DT", "SOURCE_CREATED_DT", "EFF_FROM_DT", "EFF_TO_DT", "REC_END_DT", "REC_START_DT", "CREATED_BY", "CREATED_ON", "MODIFIED_BY", "MODIFIED_ON"];

    function searchItem(item:any, value:any, searchText:any, dateFormat = "est", options = "") {
        searchText = options ? searchText : searchText.toLowerCase();
        let val: any = item[value];
        val = val.toString().toLowerCase()?.trim();

        if (isValidDate(val) && DatesColumns.includes(value) && new Date(val).toUTCString().toLowerCase().includes(searchText) && dateFormat === "est") {
            return true;
        } else if (val.toLowerCase().includes("_apex_")) {
            let fileName = val?.split('_apex_')[0];
            fileName = getDotNotation(fileName, val);
            return fileName?.toLowerCase().includes(searchText)

        } else if (searchText.includes(val.toLowerCase()) && options) {
            return true;

        } else if (val.toLowerCase().includes(searchText)) {
            return true;

        } else if (dateFormat === "DD-MM-YY" && DatesColumns.includes(value) && formatDate(val).toLocaleLowerCase().includes(searchText)) {

            return true
        }
    }


    /* eslint-disable-next-line no-restricted-globals */
    self.addEventListener('message', e => {

        if (!e.data) return;
        const message = e.data;
        const data = message.data;
        const dateFormat = message?.dateFormat;
        const searchText = message.searchText;
        let headers = message?.properties;
        const options = message?.options;

        const searchData = data.filter((item: any) => {

            if (headers) {
                for (let i = 0; i < headers.length; i++) {
                    if (!item[headers[i]]) continue;
                    const result = searchItem(item, headers[i], searchText, dateFormat, options);
                    if (result) return true;
                }
                return false;
            } else {
                for (let value in item) {
                    if (!item[value]) continue;
                    const result = searchItem(item, value, searchText.toLowerCase(), dateFormat);
                    if (result) return true;
                }
                return false;
            }
        });
        /* eslint-disable-next-line no-restricted-globals */
        self.postMessage(searchData);
    });
}

