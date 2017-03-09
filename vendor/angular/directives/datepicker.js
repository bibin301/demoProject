/* all common directives shared across the projectec listed here */

/**
 * @desc Datepicker Directive
 * @example <date-picker></date-picker> used in home.menu.tpl.html
 */
angular
        .module(cartAppObj.id)
        .directive('datePicker', datePicker);

function datePicker() {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element) {
            element.datepicker({
                autoclose: true,
                format: 'yyyy-mm-dd'
            });
        }
    };
}
