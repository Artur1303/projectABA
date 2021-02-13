$(function (){
var itemCount = $('.wrap .item').length;
var maxH = 0;
for (i=0; i<itemCount; i++) {
	var itemH = $('.wrap .item').eq(i).height();
  if (itemH > maxH) {maxH = itemH;}
}
$('.wrap .item').css('height', maxH);
});

