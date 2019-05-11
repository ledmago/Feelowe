function check_security()
		  {
		  	 var secur_dates_new =  Math.round(+new Date()/1000);
				if(getUrlParameter("secur") && getUrlParameter("lat") && getUrlParameter("long") && parseFloat(getUrlParameter("lat")) > 2 && parseFloat(getUrlParameter("long")) > 2 &&  secur_dates_new - 20 < parseFloat(getUrlParameter("secur")) &&   secur_dates_new + 20 > parseFloat(getUrlParameter("secur")))
				{
				
				var security_hash = getUrlParameter("secur");
				var security_lat = getUrlParameter("lat");
				var security_long = getUrlParameter("long");
					return true;
				}
				else{
				return false;
				}
		  
		  }

var Kanal_Yukle = { 
// Kanalları Basılı Tutuncaki Event
	kanal_hold : kendo.observable({
				didTabHold: function(e) {
					
						console.log(e);
						$(e.touch.currentTarget).fadeOut();
					
							var title = "content: 'My New Title';";
							$("#example").append("<div id='alertChatBasiliTut'>Başarılı Bir Şekilde Silindi</div>");
							$("#alertChatBasiliTut").kendoAlert({
								title: "Silindi",
        content: "Are you sure you want to <strong>Archive</strong> this Customer?",
							  messages:{
								okText: "Tamam"
							  }
							}).data("kendoAlert").open();

						GPS.Titret();
						
					}
									}),
	post_getir : function(){
			
			var posts = [];
				var gelen_post;
                
			
                    // create a template using the above definition
                    gelen_post = kendo.template($("#gelen_post").html());

                   

                    var dataSource = new kendo.data.DataSource({
                        data: posts,
                        change: function() { // subscribe to the CHANGE event of the data source
						
                            $("#main-content").html(kendo.render(gelen_post, this.view())); // populate the table
                        }
                    });
					
					
					var db = firebase.firestore();
					db.collection('posts')
					 .get()
					.then(function(querySnapshot) {
							querySnapshot.forEach(function(doc) {
						  posts.push(doc.data());
						  $("#kmsloader").fadeOut();
						});	
					dataSource.read();	
						kendo.bind($(document.body), Kanal_Yukle.kanal_hold); // Getirilen Html Kanalları Bind Et.
					});
					
					
			
		},
		
	post_refresh : function()
	{
		var posts = [];
				
				 var dataSource = new kendo.data.DataSource({
									data: posts,
									change: function() { // subscribe to the CHANGE event of the data source
									
										  $("#main-content").html(kendo.render(gelen_post, this.view())); // populate the table
										   $("#kmsloader").fadeOut(); // Kaydırarak Yenileme Loaderi Aç
									}
								});
								
								
								var db = firebase.firestore();
								db.collection('posts')
								 .get()
								.then(function(querySnapshot) {
										querySnapshot.forEach(function(doc) {
									  posts.push(doc.data());
									  
									});	
								dataSource.read();	
									kendo.bind($(document.body),  Kanal_Yukle.kanal_hold); // Getirilen Html Kanalları Bind Et.
								});
		
	}


};
	

var Konum_bilgileri = {
	
	lat:"0",
	long:"0"
	
	
};
	
	
var getUrlParameter = function getUrlParameter(sParam) {

				var sPageURL = decodeURIComponent(window.location.search.substring(1)),

					sURLVariables = sPageURL.split('&'),

					sParameterName,

					i;



				for (i = 0; i < sURLVariables.length; i++) {

					sParameterName = sURLVariables[i].split('=');



					if (sParameterName[0] === sParam) {

						return sParameterName[1] === undefined ? true : sParameterName[1];

					}

				}

};



	

function navbar(div)
{
	/*$( "#footernav li" ).each(function() {
	  $( this ).removeClass( "selected" );
	});
	div.addClass( "selected" );*/
	
}

function kullanici_bilgileri(userUid)
{		

var firat = "";										
var db = firebase.firestore();
var docRef = db.collection("users").doc(userUid);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
		firat  = doc.data().username;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

return firat;
	
}



						var users = [{username:"firat",sifre:"asd"}];
					
			

// Document Ready
$( document ).ready(function() {
   $(window).on('hashchange', function(e){
	   
	   
	   
	   $( "#footernav li" ).each(function() {
	  $( this ).removeClass( "selected" );
	});
	
	
	var id = e.target.location.hash;
	  if(id == "#/")
	  {
		   $("#main_index").addClass( "selected" );
	  }
	  else{	
	  id = id.substring(0,id.length-5);
	id = id.replace("/", "-");
	 $(id).addClass( "selected" );
	 }
	  

	
});
});



// Orjinal Loader Kısmı
    var showButton, interval, loaderElement;

    function viewInit(e) {
        showButton = $("#show").bind(kendo.support.mouseup, function() {
                        showButton.animate({ opacity: 0 });
                        startLoading();
                     });

        loaderElement = kendo.mobile.application.pane.loader.element.find("h1");
    }


    function hideLoader() {
        clearInterval(interval);
        kendo.mobile.application.hideLoading(); //hide loading popup
        kendo.mobile.application.changeLoadingMessage("Loading...");
       // loaderElement.removeClass("loaderHeading");
    }

    function viewHide(e) {
        showButton.animate({ opacity: 1 });
        hideLoader();
    }

    function startLoading(seconds = 5) {
        hideLoader();
      

       // loaderElement.addClass("loaderHeading");
        kendo.mobile.application.changeLoadingMessage(seconds + " seconds left!");

        kendo.mobile.application.showLoading(); //show loading popup

        interval = setInterval(function() {
            kendo.mobile.application.changeLoadingMessage(--seconds + " seconds left!"); //update text of the loading popup

            if (seconds == 0) {
                showButton.animate({ opacity: 1 });
                hideLoader();
            }
        }, 1000);
    }
