/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/
(function(e) {
    var config = {
        apiKey: "AIzaSyCtl7fQc5_74VEFO_MVX1MNEiyRr75BfnA",
        authDomain: "chargerocket-f9f8f.firebaseapp.com",
        databaseURL: "https://chargerocket-f9f8f.firebaseio.com",
        projectId: "chargerocket-f9f8f",
        storageBucket: "chargerocket-f9f8f.appspot.com",
        messagingSenderId: "940999677088"
    };
    firebase.initializeApp(config);
    
    const firestore = firebase.firestore();
    const docRef = firestore.collection("newletter-users");

    e.fn.notifyMe = function(t) {
        var r = e(this);
        var i = e(this).find("input[name=email]");
        var s = e(this).attr("action");
        var o = e(this).find(".note");
        e(this).on("submit", function(t) {
            t.preventDefault();
            var h = i.val();
            var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (p.test(h)) {
                $(".message").removeClass("error bad-email success-full");
                $(".message").hide().html('').fadeIn();
                $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
                o.show();

		docRef.set({
		    email: h
		}).then(function() {
		    console.log("Status saved!");
		}).catch(function( error ) {
		    console.log("Got an error: ", error);
		});
            } else {
                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                $(".message").addClass("bad-email").removeClass("success-full");
                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                $(".message").html('<p class="notify-valid">Your e-mail address is incorrect.<br>Please check it and try again.</p>').fadeIn();
                o.hide();
            }

            // Reset and hide all messages on .keyup()
            $("#notifyMe input").on('keyup keypress', function(e) {
                var code = e.keyCode || e.which;

                if (code == 13) { 
                    e.preventDefault();
                    $("#notifyMe").submit();

                } else {

                    $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
                    $(".message").fadeOut();
                }
                
            });
        })
    }

    

})(jQuery)
