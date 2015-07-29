$.extend({
    tagInput: function (options) {
    	$(document).on('keyup', '.chosen-container-multi .chosen-choices li.search-field input[type="text"]',function(e){
    		if(e.keyCode == 13 && $(this).val() !== ''){
    			_tag = $(this).val().trim().replace(/,+|\s+|,\s+/g, " ").split(' ');
    			for(var i = 0 ; i < _tag.length; i++){
                    if (_tag[i] == '') { $(this).val('');return }
    				$(this).parent().before('<li class="search-choice"><span>' + _tag[i] + '</span><a class="search-choice-close"></a></li>')
    			}
    			$(this).val('');
    		}
    	})
        $(document).on('click', '.chosen-container-multi .chosen-choices li.search-choice .search-choice-close', function(){
            $(this).parent().remove()
        })
    }
});