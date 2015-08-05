'use strict';

angular.module('pinterestNewApp')
  .directive('masonryWallDir', function(){
		return {
			controller: [
				'$scope',
				'$element',
				'$attrs', 
				function($scope, $element, $attrs){
					var wallContainer, masonryOptions;
					wallContainer = $element[0];

					masonryOptions = _.assign(
						{},
						$scope.$eval($attrs.masonryWallOptions), 
						{ itemSelector: $attrs.masonryWallDir }
					);
					this.masonry = new Masonry(
						wallContainer,
						masonryOptions
					);
					this.masonry.bindResize();

					var self = this;
					this.debouncedReload = _.debounce(function(){
						self.masonry.reloadItems();
						self.masonry.layout();
					}, 100);
				}
			]
		};
	})
	.directive('masonryItemDir', 
		function(){
			return {
				require: '^masonryWallDir',
				link: function(scope, element, attributes, masonryWallDirCtrl){

					imagesLoaded(element, function(){
						if(scope.$first){
							masonryWallDirCtrl.masonry.prepended(element);
						}else{
							masonryWallDirCtrl.masonry.appended(element);
						}
					});

					scope.$on('$destroy', masonryWallDirCtrl.debouncedReload);
				}
			};
		}
	);