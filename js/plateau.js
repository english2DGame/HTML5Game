var code = '';
var cases = new Array

function Plateau() {
	$.ajax( {
        type: "GET",
        url: "data/area01.tmx",
        dataType: "tmx",        
        success: function(xml) {
        	
        	$(xml).find('layer[name=Map]').each( 
        		function()
                {
                    code = $(this).find('data').html();
                    fillArray();
                    alert (code)
               });
                
        }



    }); 

}


function fillArray() {

    for ( var i = 4; i < code.length; i+=16 )
	{
	  var tmp = code.substring(i,i+4)

	  if (tmp == 'jQAA')
	  	cases.push(0);
	  else{
	  	if (tmp == 'jgAA')
	  		cases.push(1);
	  	else
	  		cases.push(2);
	  }

	  tmp2 = code.substring(i+4,i+8)
	  if (tmp2 == 'AI0A')
	  	cases.push(0);
	  else{
	  	if (tmp2 == 'AI4A')
	  		cases.push(1);
	  	else
	  		cases.push(2);
	  }

	  tmp3 = code.substring(i+8,i+12)
	  if (tmp3 == 'AACN')
	  	cases.push(0);
	  else{
	  	if (tmp3 == 'AACO')
	  		cases.push(1);
	  	else
	  		cases.push(2);
	  }  
	  
	}
	alert(cases)
 
}


