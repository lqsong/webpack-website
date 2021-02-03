
import $ from 'jquery';

export function contactAdd(data, success) {
    return $.ajax({
        method: 'post',
        url: `${WEBSITE_APP_APIHOST}/contact`,
        data,
        success,
     });
}