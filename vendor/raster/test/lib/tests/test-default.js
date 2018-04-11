describe('Raster default', function() {
  var defaultLeadingRems = 1.25;
  describe('The default style', function() {
    it('the baseline and layout should be correct', function () {
      var baselineElement = document.getElementById('baseline');
      var layoutElement = document.getElementById('layout');
      var htmlElement = document.getElementsByTagName("html")[0];
      var wholeNumberfontSizeStyles = ["8px", "12px", "16px", "20px"];
      for (var i = 0; i < wholeNumberfontSizeStyles.length; i++) {
        // Set the font size on the HTML Element
        var fontSizeStyle = wholeNumberfontSizeStyles[i];
        var fontSize = parseFloat(fontSizeStyle, 10);
        htmlElement.style.fontSize = fontSizeStyle;

        // Test that the font size has been set properly
        htmlElement.style.fontSize.should.equal(fontSizeStyle);
        var testElement = testHelper.testElement();
        var testClientHeight = fontSize * defaultLeadingRems;
        testElement.clientHeight.should.equal(testClientHeight);

        // Run the baseline tests
        testHelper.baselineIsCorrect(baselineElement);

        // Test that the gutter width is equal to the font size
        var gutterWidthStyle = testHelper.gutterWidthStyle();
        gutterWidthStyle.should.equal(fontSizeStyle);

        // Run the layout tests
        testHelper.layoutIsCorrect(layoutElement);
      }
      Raster.redraw();
    });
  });
});
