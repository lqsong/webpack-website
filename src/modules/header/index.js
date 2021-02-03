import $ from 'jquery';
import 'bootstrap';

$(function(){
    $('#jq-search-btn').on('click',function() {
        if($('#jq-search-input').val() === '') {
            $('#searchTipModal').modal('show');
            return false;
        }        
    })
});