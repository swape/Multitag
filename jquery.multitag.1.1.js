/*
Script name: multitag
Version: 1.1
Author: Alireza Balouch http://swape.net
Description: jQuery plugins for making multitag
Works on: Webkit , mozilla, opera
Example:
 Script:
  $(".mytags").multitag();

*/

(function($){
  $.fn.multitag = function() {
   var defaults = { };
   var options = $.extend(defaults, options);
     return this.each(function(){
       var thisinput = $(this);
       var noe = thisinput.val();
       var thisname = thisinput.attr('id');
       var temp = new Array();
       temp = noe.split(',');
       var strout = '';
       for(x= 0; x < temp.length ; x++){
         if(temp[x] != ''){
            strout = strout + '<span rel=\"' + x + '\">' + temp[x] + ' <a href="#" title="' + temp[x] + '">x</a></span> ';
          }
        }
       strout = strout + '<input type="text" id="' + thisname +'-sftaginput" class="sftaginput" value="" />';
       $(this).after('<div class="sftag" id="' + thisname + '-sftag">' + strout + '</div>');
       $(this).hide();
       var thiswidth = $(this).outerWidth();
       $('#'+ thisname + '-sftag').width(thiswidth);
       $('#'+ thisname + '-sftag').click(function(){
           $('#'+ thisname + '-sftaginput').focus();
       });
       $('#'+ thisname +'-sftaginput' ).live('keypress' , function(e){
           var thisid = '#' + $(this).parent().prev().attr('id');
            if (e.which == 44 || e.which == 0 || e.which == 13){
                var newstr = $(this).val();
                newstr = newstr.replace(',' , '');
                x++;
                temp[x] = newstr;
                sftagRenew(thisid ,temp);
                $(this).before('<span rel="' + x + '">' + newstr + ' <a href="#" title="' + newstr + '">x</a></span> ');
                $(this).val("");
                return false;
            }
       });
       $('#'+ thisname + '-sftag a').live('click' ,function(){
       var inputx = $(this).parent().attr('rel');
           temp[inputx] = null;
           sftagRenew('#' + thisname,temp);
           $(this).parent().fadeOut(300,function(){ $(this).remove(); });
           return false;
       });
       function sftagRenew(myid,temp){
           var strout='';
           for(x2=0;x2<temp.length;x2++){
             if(temp[x2]!='' && temp[x2]!=null){strout = strout+','+temp[x2];}
           }
           strout = strout.substring(1,strout.length);
           $(myid).val(strout);
       }
     });//each
  };
})(jQuery);

