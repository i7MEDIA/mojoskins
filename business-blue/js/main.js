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



//
// XDate for Event List
// --------------------------------------------------

;(function() {
	var events = document.querySelectorAll('.event-list .vevent');

	for (var i = 0; i < events.length; i++) {
		var event = events[i],
		    eventDate = event.querySelector('.eventdate');


		if (event.innerText.includes(' - ')) {
			date = eventDate.innerText.split(' - ')[0];

			eventDate.innerHTML = new XDate(date).toString('MMM dd yyyy');
		} else {
			eventDate.innerHTML = new XDate(eventDate.innerText).toString('MMM dd yyyy');
		}
	}
})();



//
// jQuery Scripts
// --------------------------------------------------
$(document).ready(function() {
	// Add caret to menu items with drop-down
	$('#site-menu1 .navbar-nav > li.dropdown-toggle > a').append(' <span class="caret"></span>');
	$('#site-menu2 .dropdown-toggle > a').append(' <span class="caret"></span>');

	!(function() {
		var menu = $('#site-menu1 > .navbar-nav'),
		    dropdownToggle = menu.find('> li.dropdown-toggle'),
		    dropdowns = dropdownToggle.find('.dropdown-menu');

		// console.log(dropdowns)

		dropdownToggle.hoverIntent({
			over: function() { $(this).addClass('open') },
			out: function() { $(this).removeClass('open') },
			timeout: 250
		});

		dropdowns.each(function() {
			var $this = $(this),
			    width;

			// Adds level classes to dropdown menu
			// $this.addClass(function() {
			// 	return 'level-' + ($this.parentsUntil(menu, 'ul').length + 1);
			// });
			
			$this.wrapInner('<div class="nav-list-wrap"></div>')

			$this.append('<div class="nav-description" />');
		});
	})();

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
});
