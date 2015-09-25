;(function($){
    var TagInput = function (ele, options) {
        var options = options || {};
        this.element  = ele;
        this.defaults = {
            'tags' : [],
            'repeat' : false,
            'num' : 3
        };
        this.options = $.extend({}, this.defaults, options);
        _me = this;
        _tag_input = this.element.find(".search-field input[type='text']");
        creatTags = function(obj){
            _this = obj;
            _tag = _this.val().trim()
            .replace(/,+/g, '')
            .replace(/，+/g, '')
            .replace(/\s+/g, '')

            if(_me.getValue().length + 1 > _me.options.num ){
                alert('关键字标签最多可以有' + _me.options.num + '个');
                 _tag_input.val('');
                return
            }
            if (_tag == '') { _this.val('');return }

            if(_me.options.repeat == false){
                for(var j = 0 ; j < _me.getValue().length ; j++){
                    if(_tag == _me.getValue()[j]){
                        alert('存在重复关键字！');
                        _tag_input.val('');
                        return
                    }
                }
            }
            _this.parent().before("<li class='search-choice'><span>" + _tag + "</span><a class='search-choice-close'></a></li>")

            _this.val('');
        }
        creatTags(_tag_input);
        this.element.find(".chosen-choices").click(function(e){
            if(! $(e.target).hasClass('search-choice')){
                _tag_input.focus();
            }
        })
        _tag_input.keyup(function(e){
           if(e.keyCode == 13 || e.keyCode == 188){
                creatTags($(this));
            }
        })
        $('body').click(function(e){
            if(_me.element.has(e.target).length <= 0){
                 creatTags(_tag_input);
            }
        });
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
