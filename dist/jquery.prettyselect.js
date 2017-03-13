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
      return clearInterval(this.interval);
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

      PrettySelect.prototype._ = {
        populate: function($options) {
          return $options.map(function() {
            var cls, rawCls, val;
            val = escape($(this).attr('value'));
            rawCls = $(this).attr('class');
            cls = typeof rawCls !== 'undefined' ? "class='" + (escape(rawCls)) + "'" : '';
            return "<li data-value='" + val + "' " + cls + ">" + ($(this).html()) + "</li>";
          }).toArray().join('');
        },
        getLabel: function($select) {
          var $pl;
          if (($pl = $select.find('option[data-placeholder]')).length > 0) {
            return $pl.text();
          } else {
            return $select.find('option:selected').text();
          }
        },
        optionsSelector: {
          onlyWithValue: 'option[value][value!=""]:not([data-placeholder])',
          withoutValue: 'option:not([data-placeholder])'
        }
      };

      function PrettySelect(select, options) {
        var $options, MutationObserver, elements;
        this.options = $.extend({}, this.defaults, options);
        this.options.optionsSelector = this.options.onlyValuedOptions ? this._.optionsSelector.onlyWithValue : this._.optionsSelector.withoutValue;
        this.$select = $(select).hide().wrap("<div class=" + this.options.wrapClass + "/>");
        this.$label = $("<div class=" + this.options.labelClass + "/>").html(this._.getLabel(this.$select));
        $options = this.$select.find(this.options.optionsSelector);
        elements = this._.populate($options);
        this.$drop = $("<ul class=" + this.options.dropClass + ">" + elements + "</ul>");
        this.closeDrop();
        this.$wrap = this.$select.parents('.' + this.options.wrapClass).attr('data-prettyselect-elements', $options.length).append(this.$label).append(this.$drop).on('click', 'li', (function(_this) {
          return function(e) {
            var oldVal, value;
            if (_this.isDisabled()) {
              return;
            }
            value = unescape($(e.currentTarget).attr('data-value'));
            oldVal = _this.$select.val();
            if (oldVal === value) {
              return;
            }
            return _this.$select.val(value).trigger('change');
          };
        })(this));
        this.$select.on('change', (function(_this) {
          return function(e) {
            var val;
            val = _this.$select.val().replace("'", "\\'");
            return _this.$label.html(_this.$select.find("option[value = '" + val + "']").html());
          };
        })(this));
        this.$label.on('click', (function(_this) {
          return function(e) {
            if (_this.isDropOpen() || _this.isDisabled()) {
              return;
            }
            e.stopPropagation();
            _this.showDrop();
            return $('html').one('click', function() {
              return _this.closeDrop();
            });
          };
        })(this));
        MutationObserver = window.MutationObserver;
        this.observer = new MutationObserver((function(_this) {
          return function(mutations, observer) {
            $options = _this.$select.find(_this.options.optionsSelector);
            _this.$wrap.attr('data-prettyselect-elements', $options.length);
            _this.$drop.html(_this._.populate($options));
            if (_this.$select.find('[selected]').length === 0) {
              return _this.$label.html(_this._.getLabel(_this.$select));
            } else {
              return _this.$label.html(_this.$select.find('option:selected').text());
            }
          };
        })(this));
        this.observer.observe(this.$select[0], {
          subtree: true,
          attributes: true,
          attributeOldValue: false,
          attributeFilter: ['class', 'selected'],
          childList: true
        });
      }

      PrettySelect.prototype.destroy = function() {
        this.observer.disconnect();
        this.$label.detach();
        this.$drop.detach();
        return this.$select.show().unwrap().removeData('PrettySelect');
      };

      PrettySelect.prototype.isDisabled = function() {
        return this.$select.attr('disabled') === 'disabled';
      };

      PrettySelect.prototype.disable = function() {
        this.$select.attr('disabled', 'disabled');
        return this.$wrap.addClass(this.options.disabledClass);
      };

      PrettySelect.prototype.enable = function() {
        this.$select.removeAttr('disabled', 'disabled');
        return this.$wrap.removeClass(this.options.disabledClass);
      };

      PrettySelect.prototype.closeDrop = function() {
        return this.$drop.css('display', 'none');
      };

      PrettySelect.prototype.showDrop = function() {
        return this.$drop.css('display', 'block');
      };

      PrettySelect.prototype.isDropOpen = function() {
        return this.$drop.css('display') === 'block';
      };

      return PrettySelect;

    })();
    return $.fn.prettyselect = function() {
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
    };
  })(window.jQuery || window.Zepto);

}).call(this);
