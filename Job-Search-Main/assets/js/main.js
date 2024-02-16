function feedbackShow() {
   console.log('i am inside feedback function')

   // $.get('/feedback',
   //    () => {
   //       $('#feedback').append(
   //          $('<li>').text('Thank You For Your FeedBack')
   //       )
   //    }
   // )
}

$('#feedback-submit').click(() => {
   $('#feedback').show();
   console.log('button clicked');
   console.log($('#feedback-name').val())

   $.post('/feedback', {
         name: $('#feedback-name').val(),
         email: $('#feedback-email').val(),
         country: $('#feedback-country').val(),
         message: $('#feedback-message').val()
      },
      () => {
         feedbackShow()
      }

   )

})




$(() => {

   $('#feedback').hide()

})

var typed = new Typed('#typed', {
   stringsElement: '#typed-strings',
   typeSpeed: 100,
   startDelay: 0,
   backSpeed: 20,
   loop: true
});