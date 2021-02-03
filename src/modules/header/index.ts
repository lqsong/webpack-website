import * as $ from 'jquery';
import 'bootstrap';

$(function(): void {
    $('#jq-search-btn').on('click', function() {
        if($('#jq-search-input').val() === '') {
            $('#searchTipModal').modal('show');
            return false;
        }
        
        return;
    })
});