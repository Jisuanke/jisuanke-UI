;(function($){
    var TagInput = function (ele, options) {
        var options = options || {}
        this.element  = ele;
        this.defaults = {
            'tags' : []
        };
        this.options = $.extend({}, this.defaults, options);
        for(var i = 0; i < this.options.tags.length; i++){
            this.element.find('.search-field').before("<li class='search-choice'><span>" + this.options.tags[i] + "</span><a class='search-choice-close'></a></li>");
        }
        this.element.find(".search-field input[type='text']").keyup(function(e){
           if(e.keyCode == 13 && $(this).val() !== ''){
                _tag = $(this).val().trim().replace(/,+|\s+|,\s+/g, ' ').split(' ');
                for(var i = 0 ; i < _tag.length; i++){
                    if (_tag[i] == '') { $(this).val('');return }
                    $(this).parent().before("<li class='search-choice'><span>" + _tag[i] + "</span><a class='search-choice-close'></a></li>")
                }
                $(this).val('');
            }
        })
        _class = this.element.attr('class').split(' ').join('.');
        $(document).on('click', '.' + _class + ' li.search-choice .search-choice-close',function(){
            $(this).parent().remove();
        })
        return this;
    }
    TagInput.prototype = {
        getValue : function(){
            var contents = [];
            this.element.find('li.search-choice').each(function(){
                contents.push($(this).find('span').text());
            })
            return contents;
        }
    }
    $.fn.tagInput = function (opt) {
        return new TagInput(this, opt);
    }
})(jQuery)
