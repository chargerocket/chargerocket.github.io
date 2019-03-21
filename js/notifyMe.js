/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/
$(function() {
	var o = $(this).find(".note");
	$("#notifyMe").submit( function(t) {
	    t.preventDefault();
	    var h = $("#mail-sub").val();
	    var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if (p.test(h)) {
	        $(".message").removeClass("error bad-email success-full");
	        $(".message").hide().html('').fadeIn();
	        $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
	        o.show();
	        $.ajax({
	            type: "POST",
	            url: "/newsletter-subscribe",
	            data: {
	                email: h
	            },
	            dataType: "json",
	            error: function(xhr, status, err) {
	                o.hide();
					console.log("status: " + status);
					console.log("error: " + err);
	                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
	                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
	                if (err == "Not Found") {
	                    $(".message").html('<p class="notify-valid">Service is not available at the moment.<br>Please check your internet connection or try again later.</p>').fadeIn();
	                } else if (err == "Bad Request") {
	                    $(".message").html('<p class="notify-valid">You have already been added to list! Hooray! We will send you more info shortly.</p>').fadeIn();
	                } else {
	                    $(".message").html('<p class="notify-valid">Oops. Looks like something went wrong.<br>Please try again later.</p>').fadeIn();
	                }
	            },
	        }).done(function(data, status, xhr) {
	            o.hide();
	            if (status == "success") {
	                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
	                $(".message").removeClass("bad-email").addClass("success-full");
	                $(".block-message").addClass("show-block-valid").removeClass("show-block-error");
	                $(".message").html('<p class="notify-valid">Congrats! You have been added to the list!</p>').fadeIn();
	            } else {
	                if ($.type == "ValidationError") {
	                    $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
	                    $(".message").html('<p class="notify-valid">This email address looks fake or invalid.<br>Please enter a real email address.</p>').fadeIn();
	                } else {
	                    $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
	                    $(".message").html('<p class="notify-valid">Oops. Looks like something went wrong.<br>Please try again later.</p>').fadeIn();
	                }
	            }
	        })
	    } else {
	        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
	        $(".message").addClass("bad-email").removeClass("success-full");
	        $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
	        $(".message").html('<p class="notify-valid">Your e-mail address is incorrect.<br>Please check it and try again.</p>').fadeIn();
	        o.hide();
	    }
	
	    // Reset and hide all messages on .keyup()
	    $("#notifyMe input").on('keyup keypress', function(e) {
	        var code = $.keyCode || $.which;
	
	        if (code == 13) { 
	            $.preventDefault();
	            //$("#notifyMe").submit();
	
	        } else {
	
	            $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
	            $(".message").fadeOut();
	        }
	        
	    });

		return false;
	})
})
