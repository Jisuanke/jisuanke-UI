;(function($){
    var TagInput = function (ele, options) {
        var options = options || {}
        this.element  = ele;
        this.defaults = {
            'tags' : []
        };
        this.options = $.extend({}, this.defaults, options);
        _tag_input = this.element.find(".search-field input[type='text']");
        for(var i = 0; i < this.options.tags.length; i++){
            this.element.find('.search-field').before("<li class='search-choice'><span>" + this.options.tags[i] + "</span><a class='search-choice-close'></a></li>");
        }
        creatTags = function(obj){
            _this = obj;
            _tag = _this.val().trim()
                .replace(/,+/g, ' ')
                .replace(/，+/g, ' ')
                .replace(/\s+/g, ' ')
                .split(' ');
            for(var i = 0 ; i < _tag.length; i++){
                if (_tag[i] == '') { _this.val('');return }
                _this.parent().before("<li class='search-choice'><span>" + _tag[i] + "</span><a class='search-choice-close'></a></li>")
            }
            _this.val('');
        }
        this.element.find(".chosen-choices").click(function(e){
            if(! $(e.target).hasClass('search-choice')){
                _tag_input.focus();
            }
        })
        _tag_input.keyup(function(e){
           if(e.keyCode == 13 && $(this).val() !== '' ){
                creatTags($(this));
            }
        })
        _tag_input.blur(function(){
            if($(this).val() !== '' ){
                creatTags($(this));
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
