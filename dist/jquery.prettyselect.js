(function() {
  var MutationObserver;

  if (window.MutationObserver != null) {
    return;
  }

  MutationObserver = (function() {
    function MutationObserver(callBack) {
      this.callBack = callBack;
    }

    MutationObserver.prototype.observe = function(element, options) {
      this.element = element;
      return this.interval = setInterval((function(_this) {
        return function() {
          var html;
          html = _this.element.innerHTML;
          if (html !== _this.oldHtml) {
            _this.oldHtml = html;
            return _this.callBack.apply(null);
          }
        };
      })(this), 200);
    };

    MutationObserver.prototype.disconnect = function() {
      return window.clearInterval(this.interval);
    };

    return MutationObserver;

  })();

  window.MutationObserver = MutationObserver;

}).call(this);

(function() {
  var __slice = [].slice;

  (function($) {
    var PrettySelect;
    PrettySelect = (function() {
      PrettySelect.prototype.defaults = {
        wrapClass: 'prettyselect-wrap',
        labelClass: 'prettyselect-label',
        dropClass: 'prettyselect-drop',
        disabledClass: 'prettyselect-disabled',
        onlyValuedOptions: false
      };

      PrettySelect.prototype.privates = {
        populate: function($options) {
          var elements;
          elements = '';
          $options.each(function() {
            var $option;
            $option = $(this);
            return elements += "<li data-value='" + ($option.attr('value')) + "'>" + ($option.html()) + "</li>";
          });
          return elements;
        },
        getInitialLabel: function($select) {
          if ($select.find('option[data-placeholder]').length > 0) {
            return $select.find('option[data-placeholder]').html();
          } else {
            return $select.find('option:selected').html();
          }
        },
        isDisabled: function($select) {
          return $select.attr('disabled') === 'disabled';
        },
        optionsSelector: {
          onlyWithValue: 'option[value][value!=""]:not([data-placeholder])',
          withoutValue: 'option:not([data-placeholder])'
        }
      };

      function PrettySelect(select, options) {
        var $drop, $label, $options, $wrap, MutationObserver, elements;
        this.options = $.extend({}, this.defaults, options);
        this.options.optionsSelector = this.options.onlyValuedOptions ? this.privates.optionsSelector.onlyWithValue : this.privates.optionsSelector.withoutValue;
        this.$select = $(select);
        this.$select.hide().wrap("<div class=" + this.options.wrapClass + "/>");
        $wrap = this.$select.parents('.' + this.options.wrapClass);
        $label = $("<div class=" + this.options.labelClass + "/>").html(this.privates.getInitialLabel(this.$select));
        $options = this.$select.find(this.options.optionsSelector);
        elements = this.privates.populate($options);
        $drop = $("<ul class=" + this.options.dropClass + ">" + elements + "</ul>").hide();
        $wrap.attr('data-prettyselect-elements', $options.length).append($label).append($drop).on('click', 'li', (function(_this) {
          return function(e) {
            if (_this.privates.isDisabled(_this.$select)) {
              return;
            }
            return _this.$select.val($(e.currentTarget).attr('data-value')).trigger('change');
          };
        })(this));
        this.$select.on('change', (function(_this) {
          return function(e) {
            var label;
            label = _this.$select.find('option:selected').html();
            return $label.html(label);
          };
        })(this));
        $label.on('click', (function(_this) {
          return function(e) {
            if ($drop.is(':visible') || _this.privates.isDisabled(_this.$select)) {
              return;
            }
            e.stopPropagation();
            $drop.show();
            return $('html').one('click', function() {
              return $drop.hide();
            });
          };
        })(this));
        MutationObserver = window.MutationObserver;
        this.observer = new MutationObserver((function(_this) {
          return function(mutations, observer) {
            $options = _this.$select.find(_this.options.optionsSelector);
            return _this.$select.parents("." + _this.options.wrapClass).attr('data-prettyselect-elements', $options.length).find("." + _this.options.dropClass).html(_this.privates.populate($options));
          };
        })(this));
        this.observer.observe(this.$select[0], {
          subtree: true,
          attributes: false,
          childList: true
        });
      }

      PrettySelect.prototype.destroy = function() {
        var $label, $ul, $wrap;
        $wrap = this.$select.parents('.' + this.options.wrapClass);
        $label = $wrap.find('.' + this.options.labelClass);
        $ul = $wrap.find('.' + this.options.dropClass);
        this.observer.disconnect();
        $label.detach();
        $ul.detach();
        this.$select.show().unwrap(this.options.wrapClass);
        return this.$select.removeData('PrettySelect');
      };

      PrettySelect.prototype.disable = function() {
        return this.$select.attr('disabled', 'disabled').parents('.' + this.options.wrapClass).addClass(this.options.disabledClass);
      };

      PrettySelect.prototype.enable = function() {
        return this.$select.removeAttr('disabled', 'disabled').parents('.' + this.options.wrapClass).removeClass(this.options.disabledClass);
      };

      return PrettySelect;

    })();
    return $.fn.extend({
      prettyselect: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('PrettySelect');
          if (!data) {
            $this.data('PrettySelect', (data = new PrettySelect(this, option)));
          }
          if (typeof option === 'string') {
            return data[option].apply(data, args);
          }
        });
      }
    });
  })(jQuery);

}).call(this);
