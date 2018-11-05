$(document).ready(function(){
    $('#explore-button').on('click', function(){
        console.log('Hi');
        $('#landing-overlay').css({ 'top': '-100%' });
        $('#main').css({ 'top': '0%' });
    });
});