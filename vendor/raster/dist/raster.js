var Raster = {
	baselineHelper: {
		SHOW_BASELINE_CLASS_NAME: 'raster-show-baseline',
		BASELINE_CLASS_NAME: 'raster-baseline',
		setup: function() {
			var showBaselineElements = document.getElementsByClassName(this.SHOW_BASELINE_CLASS_NAME);
			for (var i = 0; i < showBaselineElements.length; i++) {
				var baselineElement = showBaselineElements[i];
				var baselineContainer = this.containerForElement(baselineElement);
				this.showBaseline(baselineContainer);
			}
		},

		showBaseline: function(container) {
			container.style.height = "auto";
			container.style.width = "100%";

			var containerHeightInt = container.clientHeight;
			var parentHeightInt = container.parentNode.clientHeight;

			var counter = 0; // Use a counter to limit to 30 children to prevent infinite loops
			while (containerHeightInt < parentHeightInt && counter < 200) {
				// Add an element to contain the baseline
				var baselineElement = document.createElement("p");
				this.resetCSS(baselineElement);
				baselineElement.appendChild(document.createTextNode('\u00A0'));

				// Draw the baseline on a canvas element
				var canvas = document.createElement("canvas");
				baselineElement.style.position = "relative";
				canvas.setAttribute("width", 1);
				canvas.setAttribute("height", 1);
				canvas.style.position = "absolute";
				canvas.style.left = "0";
				canvas.style.bottom = "0";
				canvas.style.width = "100%";
				canvas.style.height = "1px";
				if (canvas && canvas.getContext) {
					context = canvas.getContext('2d');
					context.strokeStyle = "rgba(148, 235, 255, 0.5)";
					context.lineWidth = 1;
					context.strokeRect(0, 0, 1, 1);
				}
				baselineElement.appendChild(canvas);
				container.appendChild(baselineElement);
				containerHeightInt = container.clientHeight;
				counter++;
			}
		},

		// Helpers

		containerForElement: function(element) {
			var container = document.createElement("div");
			element.appendChild(container);
			this.makeContainer(container);
			return container;
		},

		makeContainer: function(element) {
			var parent = element.parentNode;
			parent.style.position = "relative";

			var height = parent.offsetHeight;
			var width = parent.offsetWidth;

			element.classList.add(this.BASELINE_CLASS_NAME);
			element.setAttribute("width", width);
			element.setAttribute("height", height);
			element.style.width = width + "px";
			element.style.height = height + "px";
			element.style.position = "absolute";
			element.style.left = "0";
			element.style.top = "0";
		},

		resetCSS: function(element) {
			element.style.border = 0;
			element.style.margin = "0";
			element.style.padding = "0";
			element.style.outline = "0";
			element.style.fontSize = "100%";
			element.style.verticalAlign = "baseline";
			element.style.background = "transparent";
		}
	},

	guidelineHelper: {
		SHOW_GUIDELINES_CLASS_NAME: 'raster-show-guidelines',
		GUIDELINES_CLASS_NAME: 'raster-guidelines',
		setup: function() {
			var showGuidelinesElements = document.getElementsByClassName(this.SHOW_GUIDELINES_CLASS_NAME);
			for (var j = 0; j < showGuidelinesElements.length; j++) {
				var guidelinesElement = showGuidelinesElements[j];
				var guidelinesContainer = this.containerForElement(guidelinesElement);
				this.showGuidelines(guidelinesContainer);
			}
		},
		showGuidelines: function(container) {
			this.fillContainerWithClassName(container, 'raster-column');
			var rasterColumns = container.getElementsByClassName('raster-column');
			for (var i = 0; i < rasterColumns.length; i++) {
				var rasterColmun = rasterColumns[i];
				this.fillContainerWithClassName(rasterColmun, 'raster-unit');
			}
		},
		fillContainerWithClassName: function(container, className) {
			var computedWidth = 0;
			var containerWidth = container.clientWidth;
			var counter = 0; // Use a counter to limit to 30 children to prevent infinite loops
			while (computedWidth < containerWidth && counter < 30) {
				var element = document.createElement("div");
				element.classList.add(className);
				container.appendChild(element);
				computedWidth = this.widthForChildElementsWithClassName(container, className);
				counter++;
			}
		},

		widthForChildElementsWithClassName: function(parent, className) {
			var nodeList = parent.getElementsByClassName(className);
			var calculateWidth = function(initial, element) {
				var style = window.getComputedStyle(element);
				var marginRight = parseInt(style.marginRight, 10);
				var width = element.clientWidth;
				var totalWidth = width + marginRight;
				return initial + totalWidth;
			};
			var width = Array.prototype.reduce.call(nodeList, calculateWidth, 0);
			return width;
		},
		containerForElement: function(element) {
			var container = document.createElement("div");
			element.appendChild(container);
			container.classList.add(this.GUIDELINES_CLASS_NAME);
			var height = element.offsetHeight;
			container.setAttribute("height", height);
			container.style.height = height + "px";
			element.style.position = "relative";
			return container;
		}
	},

	redraw: function() {
		var classNames = [this.baselineHelper.BASELINE_CLASS_NAME, this.guidelineHelper.GUIDELINES_CLASS_NAME];
		for (var i = 0; i < classNames.length; i++) {
			var className = classNames[i];
			var nodeList = document.getElementsByClassName(className);
			for (var j = nodeList.length - 1; j >= 0; --j) {
				var element = nodeList[j];
				element.parentNode.removeChild(element);
			}
		}

		this.setup();
	},

	setup: function() {
		this.baselineHelper.setup();
		this.guidelineHelper.setup();
	}
};

window.addEventListener('load', function () { Raster.setup(); }, false);
