;(function($){
    var OptionList = function (ele,opt) {
        var options = opt || {};
        var i, j;
        this.element = ele;
        this.defaults = {
            num : 10,
            choices : {
                correct: [],
                wrong: []
            }
        };
        this.options = options = $.extend({}, this.defaults, options);
        var template ={
            header: '<div class="header"><span class="check"><input type="checkbox"></span><input class="form-control" placeholder="您可以在这里撰写新选项" ><span class="add">添加</span></div>',
            hint: '<div class="checkbox hint"><label>暂时没有选项，请添加！</label></div>',
            checkbox: '<div class="checkbox"><span class="checked">[ <i class="fa fa-check"></i> ]</span><label class="jsk-text-wrap"></label><span class="badge badge-danger">X</span></div>'
        };
        var _this = this.element;
        _this.addClass('option-list');
        _this.html(template.header + template.hint);
        var _checked = _this.find('.header input:eq(0)');
        var _add = _this.find('.header .add:eq(0)');
        _this.find('.badge-danger').on('click', function(){
            $(this).parent().remove();
            if(_this.find('.checkbox').length <= 0){_this.append(template.hint);}
            if(_add.hasClass('disabled')){_add.removeClass('disabled')}
        })
        for (i in this.options.choices){
            if (_this.find('.hint').length > 0 && this.options[i].length > 0)
                _this.find('.hint').remove();
            for (j = 0; j < this.options[i].length; j++) {
                _this.append(template.checkbox);
                _this.find('.checkbox:last').addClass(i)
                     .children('label').text(this.options[i][j])
                if (i === 'wrong')
                    _this.find('.checkbox:last .checked').remove();
            }
        }

        var fn = function(){
            var _value = _this.find('.header > input:eq(0)').val().trim();
            if(_value == ''){
                alert('输入内容为空');
                return;
            }
            _this.find('.hint').remove();
            _this.append(template.checkbox);
            _this.find('.checkbox:last label').text(_value);
            if(!_checked.is(':checked')){
                _this.find('.checkbox:last').addClass('wrong');
                _this.find('.checkbox:last .checked').remove();
            }else{
                _this.find('.checkbox:last').addClass('correct')
            }
        }
        _add.on('click', function(e){
            if(_this.find('.checkbox').length >= options.num){
                _add.addClass('disabled');
                return;
            }
            fn()
        });
        return this;
    }
    OptionList.prototype = {
        getValue : function(){
            var choices = {
                    correct: [],
                    wrong: []
                };
            this.element.find('.checkbox').each(function(){
                if($(this).hasClass('correct')){
                    choices['correct'].push($(this).find('label').text());
                }else{
                    choices['wrong'].push($(this).find('label').text());
                }
            })
            return choices;
        }
    }
    $.fn.optionList = function (opt) {
        return new OptionList(this, opt);
    }
})(jQuery)