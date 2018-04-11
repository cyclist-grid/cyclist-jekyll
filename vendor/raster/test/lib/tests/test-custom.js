var units = document.title;
describe('Raster ' + units, function() {
  var defaultLineHeight = 20;
  describe('A custom style', function() {
    it('the baseline should be correct', function () {

      // Confirm that the default styles have been overridden
      var testElement = testHelper.testElement();
      testElement.clientHeight.should.not.equal(defaultLineHeight);

      // Baseline
      var contentElement = document.getElementById('baseline');
      testHelper.baselineIsCorrect(contentElement);

      // Layout
      var layoutElement = document.getElementById('layout');
      testHelper.layoutIsCorrect(layoutElement);
    });
  });
});
