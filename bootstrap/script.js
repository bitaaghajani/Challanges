$(Document).ready(function(){
$(window).scroll(function(){
    let position=$(this).scrollTop();
    if(position>=600){
        $('.camera-img').addClass('.fromLeft');
        $('.text-mission').addClass('.fromRight');
    }
    else{
        $('.camera-img').removeClass('.fromLeft');
        $('.text-mission').removeClass('.fromRight');

    }
    

});
});
$('.gallery-list-item').click(function()
{ let value=$(this).attr('data-filter');
if(value==='all'){
    $('.filter').show(300);
}else{
    $('.filter').not('.'+value).hide(300);
    $('.filter').filter('.'+value).show(300);

}


})
$('.gallery-list-item').click(function(){
    $(this).addClass('.activity-item');
})
