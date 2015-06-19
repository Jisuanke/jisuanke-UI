// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {
  $(function(){

    $('.tooltip-demo').tooltip({
      selector: "[data-toggle=tooltip]",
      container: "body"
    });

	$("input[type='number']").stepper();

	$(".selecter_1").chosen({width:'100%'});

	$(".selecter_2").chosen({width:'100%'});

	$(".selecter_3").chosen({width:'100%'});

	$(".selecter_4").chosen({width:'100%'});

	$(".selecter_5").chosen({width:'100%'});

	$(".selecter_6").chosen({width:'100%'});

    $('.checkbox input').iCheck({
        checkboxClass: 'icheckbox_flat',
        increaseArea: '20%'
    });

    $('.radio input').iCheck({
        radioClass: 'iradio_flat',
        increaseArea: '20%'
    });
    $('#accordion1').collapse();
    $('#accordion2').collapse();
  })
}(window.jQuery)
