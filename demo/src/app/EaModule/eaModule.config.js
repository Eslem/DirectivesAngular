'use strict';

angular.module('eaModule')
.constant('toastr', toastr)
.config(function(toastr){
	toastr.options.timeOut = 3000;
	toastr.options.positionClass = 'toast-top-right';
	toastr.options.preventDuplicates = true;
	toastr.options.progressBar = true;
});