
import * as $ from 'jquery';
import { AddDataType, SuccessFun } from "../../data.d";

export function contactAdd(data: AddDataType, success: SuccessFun): JQuery.jqXHR {
    return $.ajax({
        method: 'post',
        url: `${WEBSITE_APP_APIHOST}/contact`,
        data,
        success: success,
     });
}