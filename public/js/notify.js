/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/
(function(e) {
    let config = {
        apiKey: "AIzaSyCtl7fQc5_74VEFO_MVX1MNEiyRr75BfnA",
        authDomain: "chargerocket-f9f8f.firebaseapp.com",
        databaseURL: "https://chargerocket-f9f8f.firebaseio.com",
        projectId: "chargerocket-f9f8f",
        storageBucket: "chargerocket-f9f8f.appspot.com",
        messagingSenderId: "940999677088"
    };

    let actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'https://chargerocket.tech/newsletter-thanks',
        // This must be true.
        handleCodeInApp: true
    };

    firebase.initializeApp(config);

    e.fn.notifyMe = function(t) {
        let r = e(this);
        let i = e(this).find("input[name=email]");
        let s = e(this).attr("action");
        let o = e(this).find(".note");
        e(this).on("submit", function(t) {
            t.preventDefault();
            let h = i.val();
            let p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (p.test(h)) {
                $(".message").removeClass("error bad-email success-full");
                $(".message").hide().html('').fadeIn();
                $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
                o.show();

                // email addy looks good. send it.
                firebase.auth().sendSignInLinkToEmail(h, actionCodeSettings)
                .then(function() {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('emailForSignIn', h);
                })
                .catch(function(error) {
                    console.log("Error sending email link: ", error);
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
                let code = e.keyCode || e.which;

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
