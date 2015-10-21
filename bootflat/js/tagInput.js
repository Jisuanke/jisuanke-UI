;(function($){
    var TagInput = function (ele, options) {
        var options = options || {};
        this.element  = ele;
        this.defaults = {
            'tags'   : [],
            'repeat' : false,
            'num'    : 3,
            'isNaN'  :  false
        };
        this.options = $.extend({}, this.defaults, options);
        _me = this;
        _tag_input = this.element.find(".search-field input[type='text']");
        setTag   = function(str){
            _this.parent().before("<li class='search-choice'><span>" + str + "</span><a class='search-choice-close'></a></li>")
        }
        creatTags = function(obj, tags){
            _this = obj;
            if(tags){
                for(var i = 0 ; i < tags.length; i++){
                    setTag(tags[i]);
                }
                return
            }
            _tag = _this.val().trim()
            .replace(/,+/g, '')
            .replace(/，+/g, '')
            .replace(/\s+/g, '')
            if(_me.getValue().length + 1 > _me.options.num ){
                if(_tag != ''){
                    alert('关键字标签最多可以有' + _me.options.num + '个');
                }
                 _tag_input.val('');
                return
            }
            if (_tag == '') { _this.val('');return }
            if (_me.options.isNaN) {
                if(!isNaN(_tag)){
                    _tag_input.val('');
                    alert("标签不允许出现纯数字");
                    return
                }
            }
            if(_me.options.repeat == false){
                for(var j = 0 ; j < _me.getValue().length ; j++){
                    if(_tag == _me.getValue()[j]){
                        alert('存在重复关键字！');
                        _tag_input.val('');
                        return
                    }
                }
            }
            setTag(_tag);
            _this.val('');
        }
        creatTags(_tag_input, this.options.tags);
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
