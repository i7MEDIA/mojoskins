//
// Event Calendar - Clean out styles and BR elements
// --------------------------------------------------

;(function() {
	var cal = document.querySelector('.event-cal');

	if (cal) {
		var calChild = cal.querySelectorAll('*'),
			calBr = cal.querySelectorAll('.ec-day br');

		var removeYuck = function(yuck, removeType) {
			if (removeType == 'attr') {
				for (var i = 0; i < calChild.length; i++) {
					calChild[i].removeAttribute(yuck);
				}
			} else if (removeType == 'el') {
				for (var j = 0; j < calBr.length; j++) {
					calBr[j].parentNode.removeChild(calBr[j]);
				}
			}
		};

		removeYuck('style', 'attr');
		removeYuck('align', 'attr');
		removeYuck(calBr, 'el'); 
	}
})(); 


// Opt-in Bootstrap Popover & Tooltip Functionality
$(function () {
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="tooltip"]').bsTooltip();
})

//
// jQuery Scripts
// --------------------------------------------------
$(document).ready(function() {
	

	// Add carets to main menu
	// For root (add after)
	$('.sitemenu > ul > li.dropdown-toggle > a').append(' <span class="caret"></span> ');
	// For rest (add before)
	$('.sitemenu > ul ul li.dropdown-toggle > a').prepend('<span class="caret"></span> ');

	// login-link tooltip in userbar
	$('.userbar .user-spec .loginlink').attr('title', 'Sign In');
	// $('.userbar .user-spec .loginlink').bsTooltip({
	// 	placement: 'auto bottom',
	//     title: 'Sign In'
	// });

	// Collapse all tabs with .tab-collapse class
	$(".tab-collapse").tabCollapse({
		tabsClass: 'hidden-xs hidden-sm', 
		accordionClass: 'visible-xs visible-sm'
	});

	// Mobile Menu Toggle
	$('.menu-btn').on('click', function() {
		$(this).toggleClass('active');
		$('html').toggleClass('menu-drawer-open');
	});

	// Mobile Menu - Child Items
	$('.site-nav .dropdown-toggle').each(function() {
		var $this = $(this),
			$child = $this.find('> .menu-dropdown'),
			$menuLink = $this.find('> a'),
			$linkClass = ($this.hasClass('active') && !$this.find('*').hasClass('active')) ? ' class="active"' : '',
			$linkText = $menuLink.text(),
			$linkUrl = $menuLink.attr('href'),
			$link = '<li' + $linkClass + '><a href="' + $linkUrl + '">' + $linkText + ' Overview</a></li>';

		if (!$this.hasClass('open')) {
			$child.hide();
		}

		$child.prepend($link);

		$menuLink.on('click', function(e) {
			e.preventDefault();
			$this.toggleClass('open');
			$child.slideToggle(250);
		});
	});

	// Blog Tag Cloud
	$('.tagcount').text(function (_, text) {
		return text.replace(/[{()}]/g, ''); 
	});

	// Scroll Down Btn
	$('.down-button, .banner-more-link').on('click',function (e) {
	    e.preventDefault();
 
	    var target = this.hash; 
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});


	// Rearrange elements in icon-enabled forms to allow CSS adjustments to the label based on the focus state of the input
	if ($('.icon-inputs.formwizard').length) {
		$('.icon-inputs').addClass('js-icon-enabled');
		$('.icon-inputs.formwizard .settinglabel').each(function() {
			$(this).insertAfter($(this).nextAll('input, textarea'));
		});
	}

	// Add hastext class for handling elements with text entered
	if ($('.formwizard').length) {
		$('.formwizard .settingrow input[type="text"], .formwizard .settingrow textarea').each(function() {
			if ($(this).val().length) {
				$(this).parents('.settingrow').addClass('hastext');
			} else {
				$(this).parents('.settingrow').removeClass('hastext');
			}
		});
	}
	$('.formwizard .settingrow input[type="text"], .formwizard .settingrow textarea').blur(function() {
		if ($(this).val().length) {
			$(this).parents('.settingrow').addClass('hastext');
		} else {
			$(this).parents('.settingrow').removeClass('hastext');
		}
	});
	
	// Add "loading" styles and text to submission button when forms are submitted
	$('.formwizard input[type="submit"].btn').click(function(e) {
		var $this = $(this);
		var valid = true;

		$this.parents('.btn-row').prev().find('.require').each(function() {
			if ($(this).find('span[data-val-errormessage][style="display: inline;"],span[data-val-errormessage][style="display:inline;"],span[data-val-errormessage][style="display: block;"],span[data-val-errormessage][style="display:block;"],span[data-val-errormessage][style="display: inline-block;"],span[data-val-errormessage][style="display:inline-block;"],span[data-val-errormessage][style="display: inline"],span[data-val-errormessage][style="display:inline"],span[data-val-errormessage][style="display: block"],span[data-val-errormessage][style="display:block"],span[data-val-errormessage][style="display: inline-block"],span[data-val-errormessage][style="display:inline-block"]').length) {
				$(this).addClass('invalid');
				valid = false;
			}
		});

		if (!$this.nextAll('.submitted-btn').length && valid == true) {
			$this.hide();
			$('<button type="button" class="btn btn-info submitted-btn"><i class="fa fa-spinner fa-spin"></i> <span class="submitted-text">Sending...</span></button>').insertAfter($this);

			setTimeout(function() {
				if ($this.nextAll('.submitted-btn').length) {
					$this.next('.submitted-btn').remove();
					$this.show();
				}
				if (!$this.nextAll('#ctaformerrormodal').length) {
					$('<div class="modal fade" id="ctaformerrormodal" tabindex="-1" role="dialog"><div class="modal-dialog modal-sm" role="document"><div class="modal-content text-gray"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Delayed Response</h4></div><div class="modal-body"><p>Sorry, it looks like your submission is taking a while. Please be patient, check your e-mail and spam folder for our message, and if you didn\'t get anything come back here and submit the form again. If you continue to have trouble submitting the form, please <a href="/contact-us">contact us</a>. Thanks!</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Okay</button></div></div></div></div>').insertAfter($this);
					$('#ctaformerrormodal').on('hidden.bs.modal', function (e) {
						  $('#ctaformerrormodal').remove();
					});
				}
				if ($('#ctaformerrormodal').length) {
					$('#ctaformerrormodal').modal('show');
				}
			}, 15000);
		}
	});


	// Administration Drawer | Needs to be refoctored and moved to administration.js
	if ($('.workflow-type select').length > 0) {
		$('.workflow-type').addClass('show');
		var startingValue = $('.admin-drawer .workflow-type select').val();

		if (startingValue == 'Live') {
			$('.slider-switch__thumb').addClass('active refresh');

			setTimeout(function() {
				$('.slider-switch__thumb').removeClass('refresh');
			}, 280);
		}

		$('.workflow-type > a').click(function(e) {
			e.preventDefault();

			if (startingValue == 'Live') {
				$('.slider-switch__thumb').removeClass('active');

				setTimeout(function() {
					$('.admin-drawer .workflow-type select').val('WorkInProgress').change();
				}, 280);
			} else {
				$('.slider-switch__thumb').addClass('active');

				setTimeout(function() {
					$('.admin-drawer .workflow-type select').val('Live').change();
				}, 280);
			}
		});
	}
	

	// For Workflow Icons | Needs to be refactored and moved to administration.js
	// Places better content for styling that fowards the click to original input
	$('a.ModuleRejectContentLink').html('<i class="fa fa-ban"></i>').addClass('workflow-icon');

	$('input.ModuleCancelChangesLink').each(function() {
		$('<a class="workflow-icon" href="#"><i class="fa fa-times-circle"></i></a>').attr({
			title: this.title
		}).insertBefore(this).uiTooltip().click(function() {
			$(this).next().click();
			return false;
		});
	}).hide();

	$('input.ModulePostDraftForApprovalLink, input.ModuleApproveContentLink').each(function() {
		$('<a class="workflow-icon" href="#"><i class="fa fa-check-circle"></i></a>').attr({
			title: this.title
		}).insertBefore(this).uiTooltip().click(function() {
			$(this).next().click();
			return false;
		});
	}).hide();

	$('.modulelinks img[src="/Data/SiteImages/info.gif"]').each(function() {
		$('<a class="workflow-icon" href="#"><i class="fa fa-info-circle"></i></a>').attr({
			title: this.title
		}).insertBefore(this).uiTooltip().css('cursor', 'pointer').click(function(e) {
			e.preventDefault();
		});;
		return false;
	}).remove();

	// Remove classes from certain elements
	$(".pollchoose .buttonlink, input[id$='_btnShowResults']").removeClass("buttonlink");
	$(".altfile").parent(".breadcrumbs").removeClass("breadcrumbs");

	// Add watermarks to "secure" pages
	if ($(".pagebody.loginpage").length) {
		$('.loginpage .idrow input[type="text"]').attr('placeholder', 'Username');
		$('.loginpage .passwordrow input[type="password"]').attr('placeholder', 'Password');
	}
	if ($(".pagebody.passwordrecovery").length) {
		$('[id$="_pnlRecover"] h2 + .settingrow input[type="text"]').attr('placeholder', 'example@example.com');
	}

	// Add watermark to forum search
	if ($('.forumsearch input[type="text"]')) {
		$('.forumsearch input[type="text"]').attr('placeholder', 'search forums...');
	}

	// In the case that child elements exist under a menu item but are set as invisible to the current user, ensure that the dropdown-toggle class and its subsequent event handlers are removed
	$('.site-nav li.dropdown-toggle').each(function() { 
		if (!$(this).children('ul').length) { 
			$(this).removeClass('dropdown-toggle open close');
			$(this).clone().insertBefore($(this)); 
			$(this).remove(); 
		} 
	});
});
