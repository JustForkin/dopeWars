/* */ 
System.register(['../validation/utilities', '../validation/validation-locale'], function (_export) {
  var Utilities, ValidationLocale, _inherits, _classCallCheck, ValidationRule, EmailValidationRule, MinimumLengthValidationRule, MaximumLengthValidationRule, BetweenLengthValidationRule, CustomFunctionValidationRule, NumericValidationRule, RegexValidationRule, ContainsOnlyValidationRule, MinimumValueValidationRule, MinimumInclusiveValueValidationRule, MaximumValueValidationRule, MaximumInclusiveValueValidationRule, BetweenValueValidationRule, DigitValidationRule, AlphaNumericValidationRule, AlphaValidationRule, AlphaOrWhitespaceValidationRule, AlphaNumericOrWhitespaceValidationRule, MediumPasswordValidationRule, StrongPasswordValidationRule, EqualityValidationRuleBase, EqualityValidationRule, EqualityWithOtherLabelValidationRule, InEqualityValidationRule, InEqualityWithOtherLabelValidationRule, InCollectionValidationRule;

  return {
    setters: [function (_validationUtilities) {
      Utilities = _validationUtilities.Utilities;
    }, function (_validationValidationLocale) {
      ValidationLocale = _validationValidationLocale.ValidationLocale;
    }],
    execute: function () {
      'use strict';

      _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      ValidationRule = (function () {
        function ValidationRule(threshold, onValidate, message) {
          _classCallCheck(this, ValidationRule);

          this.onValidate = onValidate;
          this.threshold = threshold;
          this.message = message;
          this.errorMessage = null;
          this.ruleName = this.constructor.name;
        }

        ValidationRule.prototype.withMessage = function withMessage(message) {
          this.message = message;
        };

        ValidationRule.prototype.explain = function explain() {
          return this.errorMessage;
        };

        ValidationRule.prototype.setResult = function setResult(result, currentValue, locale) {
          if (result === true || result === undefined || result === null || result === '') {
            this.errorMessage = null;
            return true;
          } else {
            if (typeof result === 'string') {
              this.errorMessage = result;
            } else {
              if (this.message) {
                if (typeof this.message === 'function') {
                  this.errorMessage = this.message(currentValue, this.threshold);
                } else if (typeof this.message === 'string') {
                  this.errorMessage = this.message;
                } else throw 'Unable to handle the error message:' + this.message;
              } else {
                this.errorMessage = locale.translate(this.ruleName, currentValue, this.threshold);
              }
            }
            return false;
          }
        };

        ValidationRule.prototype.validate = function validate(currentValue, locale) {
          var _this = this;

          if (locale === undefined) {
            locale = ValidationLocale.Repository['default'];
          }

          currentValue = Utilities.getValue(currentValue);
          var result = this.onValidate(currentValue, this.threshold, locale);
          var promise = Promise.resolve(result);

          var nextPromise = promise.then(function (promiseResult) {
            return _this.setResult(promiseResult, currentValue, locale);
          }, function (promiseFailure) {
            if (typeof promiseFailure === 'string' && promiseFailure !== '') return _this.setResult(promiseFailure, currentValue, locale);else return _this.setResult(false, currentValue, locale);
          });
          return nextPromise;
        };

        return ValidationRule;
      })();

      _export('ValidationRule', ValidationRule);

      EmailValidationRule = (function (_ValidationRule) {
        function EmailValidationRule() {
          var _this2 = this;

          _classCallCheck(this, EmailValidationRule);

          _ValidationRule.call(this, null, function (newValue, threshold) {
            if (/\s/.test(newValue)) {
              return false;
            }
            var parts = newValue.split('@');
            var domain = parts.pop();
            var user = parts.join('@');

            if (!_this2.isFQDN(domain)) {
              return false;
            }
            return _this2.emailUserUtf8Regex.test(user);
          });
          this.emailUserUtf8Regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i;
          this.isFQDN = function (str) {
            var parts = str.split('.');
            for (var part, i = 0; i < parts.length; i++) {
              part = parts[i];
              if (part.indexOf('__') >= 0) {
                return false;
              }
              part = part.replace(/_/g, '');
              if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
              }
              if (part[0] === '-' || part[part.length - 1] === '-' || part.indexOf('---') >= 0) {
                return false;
              }
            }
            return true;
          };
        }

        _inherits(EmailValidationRule, _ValidationRule);

        return EmailValidationRule;
      })(ValidationRule);

      _export('EmailValidationRule', EmailValidationRule);

      MinimumLengthValidationRule = (function (_ValidationRule2) {
        function MinimumLengthValidationRule(minimumLength) {
          _classCallCheck(this, MinimumLengthValidationRule);

          _ValidationRule2.call(this, minimumLength, function (newValue, minimumLength) {
            return newValue.length !== undefined && newValue.length >= minimumLength;
          });
        }

        _inherits(MinimumLengthValidationRule, _ValidationRule2);

        return MinimumLengthValidationRule;
      })(ValidationRule);

      _export('MinimumLengthValidationRule', MinimumLengthValidationRule);

      MaximumLengthValidationRule = (function (_ValidationRule3) {
        function MaximumLengthValidationRule(maximumLength) {
          _classCallCheck(this, MaximumLengthValidationRule);

          _ValidationRule3.call(this, maximumLength, function (newValue, maximumLength) {
            return newValue.length !== undefined && newValue.length <= maximumLength;
          });
        }

        _inherits(MaximumLengthValidationRule, _ValidationRule3);

        return MaximumLengthValidationRule;
      })(ValidationRule);

      _export('MaximumLengthValidationRule', MaximumLengthValidationRule);

      BetweenLengthValidationRule = (function (_ValidationRule4) {
        function BetweenLengthValidationRule(minimumLength, maximumLength) {
          _classCallCheck(this, BetweenLengthValidationRule);

          _ValidationRule4.call(this, { minimumLength: minimumLength, maximumLength: maximumLength }, function (newValue, threshold) {
            return newValue.length !== undefined && newValue.length >= threshold.minimumLength && newValue.length <= threshold.maximumLength;
          });
        }

        _inherits(BetweenLengthValidationRule, _ValidationRule4);

        return BetweenLengthValidationRule;
      })(ValidationRule);

      _export('BetweenLengthValidationRule', BetweenLengthValidationRule);

      CustomFunctionValidationRule = (function (_ValidationRule5) {
        function CustomFunctionValidationRule(customFunction, threshold) {
          _classCallCheck(this, CustomFunctionValidationRule);

          _ValidationRule5.call(this, threshold, customFunction);
        }

        _inherits(CustomFunctionValidationRule, _ValidationRule5);

        return CustomFunctionValidationRule;
      })(ValidationRule);

      _export('CustomFunctionValidationRule', CustomFunctionValidationRule);

      NumericValidationRule = (function (_ValidationRule6) {
        function NumericValidationRule() {
          _classCallCheck(this, NumericValidationRule);

          _ValidationRule6.call(this, null, function (newValue, threshold, locale) {
            var numericRegex = locale.setting('numericRegex');
            var floatValue = parseFloat(newValue);
            return !Number.isNaN(parseFloat(floatValue)) && Number.isFinite(floatValue) && numericRegex.test(newValue);
          });
        }

        _inherits(NumericValidationRule, _ValidationRule6);

        return NumericValidationRule;
      })(ValidationRule);

      _export('NumericValidationRule', NumericValidationRule);

      RegexValidationRule = (function (_ValidationRule7) {
        function RegexValidationRule(regex) {
          _classCallCheck(this, RegexValidationRule);

          _ValidationRule7.call(this, regex, function (newValue, regex) {
            return regex.test(newValue);
          });
        }

        _inherits(RegexValidationRule, _ValidationRule7);

        return RegexValidationRule;
      })(ValidationRule);

      _export('RegexValidationRule', RegexValidationRule);

      ContainsOnlyValidationRule = (function (_RegexValidationRule) {
        function ContainsOnlyValidationRule(regex) {
          _classCallCheck(this, ContainsOnlyValidationRule);

          _RegexValidationRule.call(this, regex);
        }

        _inherits(ContainsOnlyValidationRule, _RegexValidationRule);

        return ContainsOnlyValidationRule;
      })(RegexValidationRule);

      _export('ContainsOnlyValidationRule', ContainsOnlyValidationRule);

      MinimumValueValidationRule = (function (_ValidationRule8) {
        function MinimumValueValidationRule(minimumValue) {
          _classCallCheck(this, MinimumValueValidationRule);

          _ValidationRule8.call(this, minimumValue, function (newValue, minimumValue) {
            return Utilities.getValue(minimumValue) < newValue;
          });
        }

        _inherits(MinimumValueValidationRule, _ValidationRule8);

        return MinimumValueValidationRule;
      })(ValidationRule);

      _export('MinimumValueValidationRule', MinimumValueValidationRule);

      MinimumInclusiveValueValidationRule = (function (_ValidationRule9) {
        function MinimumInclusiveValueValidationRule(minimumValue) {
          _classCallCheck(this, MinimumInclusiveValueValidationRule);

          _ValidationRule9.call(this, minimumValue, function (newValue, minimumValue) {
            return Utilities.getValue(minimumValue) <= newValue;
          });
        }

        _inherits(MinimumInclusiveValueValidationRule, _ValidationRule9);

        return MinimumInclusiveValueValidationRule;
      })(ValidationRule);

      _export('MinimumInclusiveValueValidationRule', MinimumInclusiveValueValidationRule);

      MaximumValueValidationRule = (function (_ValidationRule10) {
        function MaximumValueValidationRule(maximumValue) {
          _classCallCheck(this, MaximumValueValidationRule);

          _ValidationRule10.call(this, maximumValue, function (newValue, maximumValue) {
            return newValue < Utilities.getValue(maximumValue);
          });
        }

        _inherits(MaximumValueValidationRule, _ValidationRule10);

        return MaximumValueValidationRule;
      })(ValidationRule);

      _export('MaximumValueValidationRule', MaximumValueValidationRule);

      MaximumInclusiveValueValidationRule = (function (_ValidationRule11) {
        function MaximumInclusiveValueValidationRule(maximumValue) {
          _classCallCheck(this, MaximumInclusiveValueValidationRule);

          _ValidationRule11.call(this, maximumValue, function (newValue, maximumValue) {
            return newValue <= Utilities.getValue(maximumValue);
          });
        }

        _inherits(MaximumInclusiveValueValidationRule, _ValidationRule11);

        return MaximumInclusiveValueValidationRule;
      })(ValidationRule);

      _export('MaximumInclusiveValueValidationRule', MaximumInclusiveValueValidationRule);

      BetweenValueValidationRule = (function (_ValidationRule12) {
        function BetweenValueValidationRule(minimumValue, maximumValue) {
          _classCallCheck(this, BetweenValueValidationRule);

          _ValidationRule12.call(this, { minimumValue: minimumValue, maximumValue: maximumValue }, function (newValue, threshold) {
            return Utilities.getValue(threshold.minimumValue) <= newValue && newValue <= Utilities.getValue(threshold.maximumValue);
          });
        }

        _inherits(BetweenValueValidationRule, _ValidationRule12);

        return BetweenValueValidationRule;
      })(ValidationRule);

      _export('BetweenValueValidationRule', BetweenValueValidationRule);

      DigitValidationRule = (function (_ValidationRule13) {
        function DigitValidationRule() {
          var _this3 = this;

          _classCallCheck(this, DigitValidationRule);

          _ValidationRule13.call(this, null, function (newValue, threshold) {
            return _this3.digitRegex.test(newValue);
          });
          this.digitRegex = /^\d+$/;
        }

        _inherits(DigitValidationRule, _ValidationRule13);

        return DigitValidationRule;
      })(ValidationRule);

      _export('DigitValidationRule', DigitValidationRule);

      AlphaNumericValidationRule = (function (_ValidationRule14) {
        function AlphaNumericValidationRule() {
          var _this4 = this;

          _classCallCheck(this, AlphaNumericValidationRule);

          _ValidationRule14.call(this, null, function (newValue, threshold) {
            return _this4.alphaNumericRegex.test(newValue);
          });
          this.alphaNumericRegex = /^[a-z0-9]+$/i;
        }

        _inherits(AlphaNumericValidationRule, _ValidationRule14);

        return AlphaNumericValidationRule;
      })(ValidationRule);

      _export('AlphaNumericValidationRule', AlphaNumericValidationRule);

      AlphaValidationRule = (function (_ValidationRule15) {
        function AlphaValidationRule() {
          var _this5 = this;

          _classCallCheck(this, AlphaValidationRule);

          _ValidationRule15.call(this, null, function (newValue, threshold) {
            return _this5.alphaRegex.test(newValue);
          });
          this.alphaRegex = /^[a-z]+$/i;
        }

        _inherits(AlphaValidationRule, _ValidationRule15);

        return AlphaValidationRule;
      })(ValidationRule);

      _export('AlphaValidationRule', AlphaValidationRule);

      AlphaOrWhitespaceValidationRule = (function (_ValidationRule16) {
        function AlphaOrWhitespaceValidationRule() {
          var _this6 = this;

          _classCallCheck(this, AlphaOrWhitespaceValidationRule);

          _ValidationRule16.call(this, null, function (newValue, threshold) {
            return _this6.alphaNumericRegex.test(newValue);
          });
          this.alphaNumericRegex = /^[a-z\s]+$/i;
        }

        _inherits(AlphaOrWhitespaceValidationRule, _ValidationRule16);

        return AlphaOrWhitespaceValidationRule;
      })(ValidationRule);

      _export('AlphaOrWhitespaceValidationRule', AlphaOrWhitespaceValidationRule);

      AlphaNumericOrWhitespaceValidationRule = (function (_ValidationRule17) {
        function AlphaNumericOrWhitespaceValidationRule() {
          var _this7 = this;

          _classCallCheck(this, AlphaNumericOrWhitespaceValidationRule);

          _ValidationRule17.call(this, null, function (newValue, threshold) {
            return _this7.alphaNumericRegex.test(newValue);
          });
          this.alphaNumericRegex = /^[a-z0-9\s]+$/i;
        }

        _inherits(AlphaNumericOrWhitespaceValidationRule, _ValidationRule17);

        return AlphaNumericOrWhitespaceValidationRule;
      })(ValidationRule);

      _export('AlphaNumericOrWhitespaceValidationRule', AlphaNumericOrWhitespaceValidationRule);

      MediumPasswordValidationRule = (function (_ValidationRule18) {
        function MediumPasswordValidationRule(minimumComplexityLevel) {
          _classCallCheck(this, MediumPasswordValidationRule);

          _ValidationRule18.call(this, minimumComplexityLevel ? minimumComplexityLevel : 3, function (newValue, threshold) {
            if (typeof newValue !== 'string') return false;
            var strength = 0;

            strength += /[A-Z]+/.test(newValue) ? 1 : 0;
            strength += /[a-z]+/.test(newValue) ? 1 : 0;
            strength += /[0-9]+/.test(newValue) ? 1 : 0;
            strength += /[\W]+/.test(newValue) ? 1 : 0;
            return strength >= threshold;
          });
        }

        _inherits(MediumPasswordValidationRule, _ValidationRule18);

        return MediumPasswordValidationRule;
      })(ValidationRule);

      _export('MediumPasswordValidationRule', MediumPasswordValidationRule);

      StrongPasswordValidationRule = (function (_MediumPasswordValidationRule) {
        function StrongPasswordValidationRule() {
          _classCallCheck(this, StrongPasswordValidationRule);

          _MediumPasswordValidationRule.call(this, 4);
        }

        _inherits(StrongPasswordValidationRule, _MediumPasswordValidationRule);

        return StrongPasswordValidationRule;
      })(MediumPasswordValidationRule);

      _export('StrongPasswordValidationRule', StrongPasswordValidationRule);

      EqualityValidationRuleBase = (function (_ValidationRule19) {
        function EqualityValidationRuleBase(otherValue, equality, otherValueLabel) {
          _classCallCheck(this, EqualityValidationRuleBase);

          _ValidationRule19.call(this, {
            otherValue: otherValue,
            equality: equality,
            otherValueLabel: otherValueLabel
          }, function (newValue, threshold) {
            var otherValue = Utilities.getValue(threshold.otherValue);
            if (newValue instanceof Date && otherValue instanceof Date) return threshold.equality === (newValue.getTime() === otherValue.getTime());
            return threshold.equality === (newValue === otherValue);
          });
        }

        _inherits(EqualityValidationRuleBase, _ValidationRule19);

        return EqualityValidationRuleBase;
      })(ValidationRule);

      _export('EqualityValidationRuleBase', EqualityValidationRuleBase);

      EqualityValidationRule = (function (_EqualityValidationRuleBase) {
        function EqualityValidationRule(otherValue) {
          _classCallCheck(this, EqualityValidationRule);

          _EqualityValidationRuleBase.call(this, otherValue, true);
        }

        _inherits(EqualityValidationRule, _EqualityValidationRuleBase);

        return EqualityValidationRule;
      })(EqualityValidationRuleBase);

      _export('EqualityValidationRule', EqualityValidationRule);

      EqualityWithOtherLabelValidationRule = (function (_EqualityValidationRuleBase2) {
        function EqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
          _classCallCheck(this, EqualityWithOtherLabelValidationRule);

          _EqualityValidationRuleBase2.call(this, otherValue, true, otherLabel);
        }

        _inherits(EqualityWithOtherLabelValidationRule, _EqualityValidationRuleBase2);

        return EqualityWithOtherLabelValidationRule;
      })(EqualityValidationRuleBase);

      _export('EqualityWithOtherLabelValidationRule', EqualityWithOtherLabelValidationRule);

      InEqualityValidationRule = (function (_EqualityValidationRuleBase3) {
        function InEqualityValidationRule(otherValue) {
          _classCallCheck(this, InEqualityValidationRule);

          _EqualityValidationRuleBase3.call(this, otherValue, false);
        }

        _inherits(InEqualityValidationRule, _EqualityValidationRuleBase3);

        return InEqualityValidationRule;
      })(EqualityValidationRuleBase);

      _export('InEqualityValidationRule', InEqualityValidationRule);

      InEqualityWithOtherLabelValidationRule = (function (_EqualityValidationRuleBase4) {
        function InEqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
          _classCallCheck(this, InEqualityWithOtherLabelValidationRule);

          _EqualityValidationRuleBase4.call(this, otherValue, false, otherLabel);
        }

        _inherits(InEqualityWithOtherLabelValidationRule, _EqualityValidationRuleBase4);

        return InEqualityWithOtherLabelValidationRule;
      })(EqualityValidationRuleBase);

      _export('InEqualityWithOtherLabelValidationRule', InEqualityWithOtherLabelValidationRule);

      InCollectionValidationRule = (function (_ValidationRule20) {
        function InCollectionValidationRule(collection) {
          _classCallCheck(this, InCollectionValidationRule);

          _ValidationRule20.call(this, collection, function (newValue, threshold) {
            var collection = Utilities.getValue(threshold);
            for (var i = 0; i < collection.length; i++) {
              if (newValue === collection[i]) return true;
            }
            return false;
          });
        }

        _inherits(InCollectionValidationRule, _ValidationRule20);

        return InCollectionValidationRule;
      })(ValidationRule);

      _export('InCollectionValidationRule', InCollectionValidationRule);
    }
  };
});