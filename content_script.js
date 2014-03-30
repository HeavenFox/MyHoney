var dialogTemplate = '<div class="generic_dialog pop_dialog" id="dialog_1" style="">' +
'	<div class="generic_dialog_popup" style="margin-top: 125px;">' +
'		<div class="pop_container_advanced">' +
'			<div class="pop_content" id="pop_content" tabindex="0" role="alertdialog">' +
'				<h2 class="dialog_title" id="title_dialog_1"><span>Change Name and Avatar</span></h2>' +
'				<div class="dialog_content">' +
'					<div class="dialog_body">' +
'						<div>' +
'							<div class="pbs">What name do you want to change into?</div>' +
'							<div class="uiTypeahead uiClearableTypeahead uiPlacesTypeahead">' +
'								<div class="wrap">' +
'									<div class="innerWrap">' +
'										<input type="text" class="inputtext textInput" name="username" placeholder="" >' +
'									</div>' +
'								</div>' +
'							</div>' +
'						</div>' +
'						<div>' +
'							<div class="pbs">What avatar image do you want to use?</div>' +
'							<div class="uiTypeahead uiClearableTypeahead uiPlacesTypeahead">' +
'								<div class="wrap">' +
'									<div class="innerWrap">' +
'										<input type="text" class="inputtext textInput" name="avatar" placeholder="">' +
'									</div>' +
'								</div>' +
'							</div>' +
'						</div>' +
'					</div>' +
'					<div class="dialog_buttons clearfix">' +
'						<div class="rfloat mlm">' +
'							<label class="uiButton uiButtonLarge">' +
'								<input type="button" name="cancel" value="Cancel">' +
'							</label>' +
'							<label class="uiButton uiButtonLarge uiButtonConfirm">' +
'								<input type="button" name="ok" value="Okay">' +
'							</label>' +
'						</div>' +
'					</div>' +
'				</div>' +
'			</div>' +
'		</div>' +
'	</div>' +
'</div>';

function constructDialog($element) {
	$dialog = $(dialogTemplate);
	$dialog.appendTo('body');
	$dialog.find('input[name=cancel]').click(function() {
		$dialog.remove();
	});
	$dialog.find('input[name=ok]').click(function() {
		replaceConversation($element, $dialog.find('input[name=username]').val(), $dialog.find('input[name=avatar]').val());
		$dialog.remove();
	});
}

function replaceConversation($element, name, url) {
	function doReplace() {
		if (name.length > 0) {
			$nameElement = $element.find('.fbNubFlyoutTitlebar .titlebarText');
			if ($nameElement.text() != name) {
				$nameElement.text(name);
			}
			
		}
		
		if (url.length > 0) {
			$element.find('img.profilePhoto').each(function() {
				if (this.src != url) {
					this.src = url;
				}
			});
		}
		
	}

	doReplace();

	$conversationList = $element.find('.conversation');
	$conversationList.off('DOMSubtreeModified');
	$conversationList.on('DOMSubtreeModified', doReplace);
}

function pollForChats() {
	$chats = $('#ChatTabsPagelet > .fbNubGroup');
	if ($chats.length > 0) {
		$chats.on('DOMSubtreeModified', function() {
			$('#ChatTabsPagelet .fbDockChatTabFlyout .fbNubFlyoutBody').each(function() {

				if (!$(this).data('mutated')) {
					var $box = $(this).parents('.fbNubFlyoutInner').first();
					$(this).dblclick(function() {
						constructDialog($box);
					});
					$(this).data('mutated', '1');
				}
			});
		});
	} else {
		window.setTimeout(pollForChats, 100);
	}
	
}

pollForChats();
