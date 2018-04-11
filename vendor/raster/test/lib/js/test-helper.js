var defaultNumIndentGutters = 2;
var defaultNumUnitGutters = 4;
var defaultNumColumnUnits = 2;

var testHelper = {
  baselineIsCorrect: function(rootElement) {
    // The heights and margins should be multiples of the leading

    var leading = this.leading();
    var nodeList = rootElement.querySelectorAll('*');

    for (var i = nodeList.length - 1; i >= 0; --i) {
      var element = nodeList[i];
      var totalHeight = this.totalHeightForElement(element);
      if (!element.id) {
        // Only test items with an ID
        continue;
      }

      totalHeight.should.be.above(0);
      if (totalHeight < 1) {
        return false;
      }

      var remainder = totalHeight % leading;
      remainder.should.equal(0);
      if (remainder !== 0) {
        return false;
      }
    }

    return true;
  },

  layoutIsCorrect: function(rootElement, layoutSizes) {
    layoutSizes = layoutSizes || this.layoutSizes(this.gutterWidth(), defaultNumUnitGutters, defaultNumColumnUnits);
    var nodeList = rootElement.querySelectorAll('.columns', '.gutters', '.units');
    for (var i = nodeList.length - 1; i >= 0; --i) {
      var element = nodeList[i];
      var multiplier = parseInt(this.trimmedInnerText(element));
      var testProperty = element.classList.contains('width') ? 'width' : 'marginLeft';
      var style = window.getComputedStyle(element);
      var valueStyle = style[testProperty];
      var value = parseFloat(valueStyle, 10);

      var base;
      var gutterWidth = null;
      if (element.classList.contains('columns')) {
        // Test columns
        gutterWidth = layoutSizes.gutterWidth;
        base = layoutSizes.columnWidth;
      } else if (element.classList.contains('units')) {
        // Test units
        gutterWidth = layoutSizes.gutterWidth;
        base = layoutSizes.unitWidth;
      } else {
        // Test Gutters
        base = layoutSizes.gutterWidth;
      }

      var result = this.widthPropertyMatches(base, multiplier, value, gutterWidth);
      if (!window.mochaPhantomJS && testProperty == 'width') {
        // Skip this test when running in `phantomjs` because `phantomjs` doesn't support flexbox
        result.should.equal(true);
      }
    }
  },

  // Helpers

  widthPropertyMatches: function(base, multiplier, value, gutterWidth) {
    var testValue = base * multiplier;
    if (!!gutterWidth) {
      testValue += gutterWidth * (multiplier - 1);
    }
    return testValue == value;
  },

  layoutSizes: function(gutterWidth, numUnitGutters, numColumnUnits) {
    var unitWidth = numUnitGutters * gutterWidth;
    var columnWidth = numColumnUnits * (unitWidth + gutterWidth) - gutterWidth;
    return {
      gutterWidth: gutterWidth,
      unitWidth: unitWidth,
      columnWidth: columnWidth
    };
  },

  trimmedInnerText: function(element) {
    var text = element.innerText.trim();
    var index = text.indexOf('\n');
    if (index > 0) {
      text = text.substring(0, index);
    }
    return text;
  },

  leading: function() {
    var style = window.getComputedStyle(document.body);
    return parseFloat(style.lineHeight, 10);
  },

  gutterWidth: function() {
    return parseFloat(this.gutterWidthStyle(), 10);
  },

  gutterWidthStyle: function() {
    var gutterElement = document.getElementsByClassName('indent-one-gutter')[0];
    var style = window.getComputedStyle(gutterElement);
    return style.marginLeft;
  },

  totalHeightForElement: function(element) {
    var style = window.getComputedStyle(element);
    var computedHeight = element.clientHeight;
    computedHeight += parseFloat(style.marginTop, 10);
    computedHeight += parseFloat(style.marginBottom, 10);
    computedHeight += parseFloat(style.paddingTop, 10);
    computedHeight += parseFloat(style.paddingBottom, 10);
    computedHeight += parseFloat(style.borderTopWidth, 10);
    computedHeight += parseFloat(style.borderBottomWidth, 10);
    return computedHeight;
  },

  testElement: function() {
    var testElements = document.getElementsByTagName('li');
    var testElement = testElements[0];
    testElement.should.be.an('object');
    return testElement;
  }
};
