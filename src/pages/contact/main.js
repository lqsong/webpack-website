// 引入样式
import '../../assets/css/global.scss'; // 全局
import './main.scss'; // 当前页面

// 引入第三方
import $ from 'jquery';
import 'bootstrap';

// 引入头部js
import '../../modules/header/index';
// 引入底部js
import '../../modules/footer/index';

import { contactAdd  } from "./modules/service/index";

$(function(){
    console.log('Contact');


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        
      form.addEventListener('submit', function (event) {
        
        //if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        //}

        form.classList.add('was-validated');


        if (form.checkValidity()) {

            contactAdd(
              {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                content: $('#content').val()
              }, 
              function (result,status,xhr) {
                console.log(result,status,xhr);
                const { code } = result;
                if(code === 0) {
                  $('#jq-submit-tips').modal('show');
                  form.classList.remove('was-validated');
                  form.reset();                  
                }
              }
            );

           /*
            $.ajax({
              method: 'post',
              url: `${WEBSITE_APP_APIHOST}/contact`,
              data: {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                content: $('#content').val()
              },
              success: function (result,status,xhr) {
                console.log(result,status,xhr);
                const { code } = result;
                if(code === 0) {
                  $('#jq-submit-tips').modal('show');
                  form.classList.remove('was-validated');
                  form.reset();                  
                }
              }
           }) 
           */
        }




      }, false)
    })
    
});
