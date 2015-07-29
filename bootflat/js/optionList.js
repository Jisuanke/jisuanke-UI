$.fn.extend({
    optionList: function (options) {
        var options = options || {};
        var template ={
            header: '<div class="header"><span class="check"><input type="checkbox"></span><input class="form-control" placeholder="您可以在这里撰写新选项" ><span class="add">添加</span></div>',
            hint: '<div class="checkbox hint"><label>暂时没有选项，请添加！</label></div>',
            checkbox: '<div class="checkbox"><span class="checked">[ <i class="fa fa-check"></i> ]</span><label class="jsk-text-wrap"></label><span class="badge badge-danger">X</span></div>'
        }
        $(this).addClass('option-list');
        $(this).html(template.header + template.hint);
        var _this = $(this);
        var _checked = _this.find('.header input:eq(0)');
        var _add = _this.find('.header .add:eq(0)');
        var fn = function(){
            var _value = _this.find('.header > input:eq(0)').val().trim();
            if(_value == ''){
                alert('输入内容为空');
                return;
            }
            _this.find('.hint').remove();
            _this.append(template.checkbox)
            _this.find('.checkbox:last label').text(_value);
            _this.find('.badge-danger').on('click', function(){
                $(this).parent().remove();
                if(_this.find('.checkbox').length <= 0){_this.append(template.hint);}
                if(_add.hasClass('disabled')){_add.removeClass('disabled')}
            })
            if(!_checked.is(':checked')){
                _this.find('.checkbox:last .checked').remove();
            }
        }
        _add.on('click', function(e){
            if('num' in options && _this.find('.checkbox').length >= options.num){
                _add.addClass('disabled');
                return;
            }
            fn()
        });
    }
});