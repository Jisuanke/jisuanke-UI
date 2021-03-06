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
            checkbox: '<div class="checkbox"><span class="checked">[ <i class="fa fa-check"></i> ]</span><label class="jsk-text-wrap"></label><span class="badge badge-danger" data-option="choice-close">X</span></div>'
        };
        var _this = this.element;
        _this.addClass('option-list');
        _this.html(template.header + template.hint);
        var _checked = _this.find('.header input:eq(0)');
        var _add = _this.find('.header .add:eq(0)');
        $(document).on('click', '[data-option="choice-close"]', function(){
            $(this).trigger('option-list-delete');
            $(this).parent().remove();
            if(_this.find('.checkbox').length <= 0){_this.append(template.hint)};
            if(_add.hasClass('disabled')){_add.removeClass('disabled')};
        });
        for (i in this.options.choices){
            for (j in this.options.choices[i]) {
                if (_this.find('.hint').length > 0)
                    _this.find('.hint').remove();
                _this.append(template.checkbox);
                _this.find('.checkbox:last').addClass(i)
                _this.find('.checkbox:last').children('label').text(this.options.choices[i][j]).attr('data-id',j);
                if (i === 'wrong')
                    _this.find('.checkbox:last .checked').remove();
            }
        }
        var fn = function(obj){
            var _value = _this.find('.header > input:eq(0)').val().trim();
            if(_value == ''){
                alert('输入内容为空');
                return;
            }
            for(var i = 0; i < _this.find('.checkbox').length; i++){
                if(_value === _this.find('.checkbox:eq(' + i + ') label').text()){
                    alert("选项有重复！");
                    return
                }
            }
            _this.find('.hint').remove();
            _this.append(template.checkbox);
            _this.find('.checkbox:last label').text(_value);
            if(!_checked.is(':checked')){
                _this.find('.checkbox:last').addClass('wrong');
                _this.find('.checkbox:last .checked').remove();
            }else{
                _checked.attr('checked', false);
                _this.find('.checkbox:last').addClass('correct');
            }
            _this.find('.header > input:eq(0)').val('')
            obj.trigger('option-list-add');
        }
        _input = _this.find("input")
        _input.keyup(function(e){
           if(e.keyCode == 13 && $(this).val() !== ''){
                _add.click()
            }
        })
        _add.on('click', function(e){
            if(_this.find('.checkbox').length >= options.num){
                _add.addClass('disabled');
                return;
            }
            fn($(this));
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