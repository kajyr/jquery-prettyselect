(function() {
  var __slice = [].slice;

  (function($) {
    var PrettySelect;
    PrettySelect = (function() {
      PrettySelect.prototype.defaults = {
        wrapClass: 'prettyselect-wrap',
        labelClass: 'prettyselect-label',
        dropClass: 'prettyselect-drop'
      };

      PrettySelect.prototype.privates = {
        populate: function($select) {
          var elements, val;
          elements = '';
          val = $select.val();
          $select.find('option').each(function() {
            var $option;
            $option = $(this);
            return elements += '<li data-value="' + $option.attr('value') + '">' + $option.html() + '</li>';
          });
          return elements;
        },
        mutationObserver: function($element, callBack) {
          var MutationObserver, interval, observer;
          if (!window.MutationObserver) {
            interval = setInterval($.proxy(function() {
              var html, oldHtml;
              html = this.element.html();
              oldHtml = this.element.data('mo-html');
              if (html !== oldHtml) {
                this.element.data('mo-html', html);
                return callBack();
              }
            }, {
              element: $element,
              callBack: callBack
            }), 200);
            return $element.data('mutationObserver', interval);
          } else {
            MutationObserver = window.MutationObserver;
            observer = new MutationObserver(callBack);
            observer.observe($element[0], {
              subtree: true,
              attributes: false,
              childList: true
            });
            return $element.data('mutationObserver', observer);
          }
        }
      };

      function PrettySelect(select, options) {
        var $drop, $label, $wrap, elements, label;
        this.options = $.extend({}, this.defaults, options);
        this.$select = $(select);
        this.$select.hide().wrap("<div class=" + this.options.wrapClass + "/>");
        $wrap = this.$select.parents('.' + this.options.wrapClass);
        label = this.$select.find('option:selected').html();
        $label = $("<div class=" + this.options.labelClass + "/>").html(label);
        $wrap.append($label);
        elements = this.privates.populate(this.$select);
        $drop = $("<ul class=" + this.options.dropClass + ">" + elements + "</ul>");
        $drop.hide();
        $wrap.append($drop);
        $wrap.on('click', 'li', $.proxy(function(e) {
          var $li, $select;
          $li = $(e.target);
          $select = this;
          $select[0].value = $li.data('value');
          return $select.trigger('change');
        }, this.$select));
        this.$select.on('change', function(e) {
          var $select, val;
          $select = $(e.target);
          val = $select.val();
          label = $select.find("option[value = " + val + "]").html();
          return $label.html(label);
        });
        $label.on('click', function(e) {
          if ($drop.is(':visible')) {
            return;
          }
          e.stopPropagation();
          $drop.show();
          return $('html').one('click', function() {
            return $drop.hide();
          });
        });
        this.privates.mutationObserver(this.$select, $.proxy(function(mutations, observer) {
          $wrap = this.$select.parents("." + this.options.wrapClass);
          return $wrap.find("." + this.options.dropClass).html(this.privates.populate(this.$select));
        }, this));
      }

      PrettySelect.prototype.destroy = function() {
        var $label, $ul, $wrap, observer;
        $wrap = this.$select.parents('.' + this.options.wrapClass);
        $label = $wrap.find('.' + this.options.labelClass);
        $ul = $wrap.find('.' + this.options.dropClass);
        observer = this.$select.data('mutationObserver');
        if (typeof observer === 'object') {
          observer.disconnect();
        } else {
          window.clearInterval(observer);
        }
        $label.detach();
        $ul.detach();
        this.$select.show().unwrap(this.options.wrapClass);
        return this.$select.removeData('PrettySelect');
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
