# Raster

Raster is a simple typography and grid framework written in SCSS.

* It replaces the default sizes for header elements (i.e., `H1`-`H6`) based on the [traditional point scale](http://markboulton.co.uk/journal/five-simple-steps-to-better-typography-part-4).
* But the header font sizes are not fixed, instead they're defined as ratios (based on `12px` body type). This means if the body font size is not `12px`, then the sizes of the headers maintain their proportional size relative to the body font size. For example, at a font size of `12px`, the `H1` element will have a font size of `36px` (the "double great primer" size), but if the body font size is `11px`, then the `H1` element will have a font size of `33px` (`36/12 * 11 = 33`).
* Text is [aligned to the baseline grid](http://24ways.org/2006/compose-to-a-vertical-rhythm) using the following rules:
	* Headers are given a `line-height` that's a multiple of the [leading](http://en.wikipedia.org/wiki/Leading).
	* All block level elements are given a `top-margin` of `0` and a `bottom-margin` equal to the leading.

## Usage

There are two ways to use Raster: either by simply linking the default CSS, or by recompiling the SCSS for finer-grained control.

### Use Default CSS

Simply import the compiled CSS file from `dist/raster.css` in HTML:

``` html
<link rel="stylesheet" href="[path to raster]/dist/raster.css">
```

This pre-compiled version uses the browsers default font size and a `line-height` equal to `1.25rem`. Since all the `line-height` and `font-size` calculations are done in `rem` units, any font size can be specified on the root `HTML` element and the header elements will continue to maintain their proportional sizes and all text elements will stay aligned to the baseline grid.

### Recompile SCSS

Recompile Sass with a new `line-height`, `font-size`, or both by importing the SCSS file at `dist/raster.scss`. Simply set the `$font-size` and `$line-height` variables before importing the SCSS file.


``` scss
$font-size: 15px;
$line-height: 20px;
@import "[path to raster]/dist/raster";
```

## Caveats

* Raster is only tested in WebKit derivative browsers: Chrome and Safari.
* Due to the imprecisions of CSS math, `font-size` and `line-height` combinations that result in a leading with a decimal will not align to the baseline grid. For example, a `font-size` of `16px` and `line-height` of `120%` results in a decimal number leading of `19.2` (`1.2 * 16 = 19.2`). WebKit's handling of the decimal results in inconsistent leading sizes causing the text to drift from the baseline. There are three work-arounds for this problem:
	1. Specify a `$line-height` and `$font-size` in pixels. The text will always align properly to the baseline grid if the `$line-height` and `$font-size` are specified in pixels.
	2. Make sure your `font-size` and `line-height` combination results in a whole number leading. For example, a `$font-size` of `12px` and a line-height of `125%`, results in a leading of `15px` (`12px × 1.25 = 15px`). Since `15px` is a whole number, the text will align to the baseline.
	3. Just don't worry about the slight drift caused by off-by-one errors rendering text to the baseline.

## Typography

### Typographic Hierarchy

[Traditional typography defines](http://markboulton.co.uk/journal/five-simple-steps-to-better-typography-part-4) defines the following font sizes:

* `6pt`: nonpareil
* `7pt`: minion
* `8pt`: brevier or small text
* `9pt`: bourgeois or galliard
* `10pt`: long primer or garamond
* `11pt`: small pica or philosophy
* `12pt`: pica
* `14pt`: english or augustin
* `18pt`: great primer
* `21pt`: double small pica or double pica
* `24pt`: double pica or two-line pica
* `36pt`: double great primer or 2-line great primer

It's easy to use these values "as is" in CSS, but then only a few font sizes are available for body text. Only the sizes between `10pt` to `18pt` are appropriate as body font sizes, and going above `12pt` throws off the proportional harmony with the larger sizes.

Raster's solution to this problem is to treat these as proportional font sizes rather than specific font sizes. Raster uses `12pt` ("pica") as the default font size and defines the rest as ratios as follows:

* "double great primer": `36 / 12`
* "double pica": `24 / 12`
* "double small pica": `21 / 12`
* "great primer": `18 / 12`s
* "english": `14 / 12`
* "pica": `12 / 12`

These ratios are then mapped to these HTML header tags:

* `H1`: double great primer
* `H2`: double pica
* `H3`: double small pica
* `H4`: great primer
* `H5`: english
* `H6`: pica

Since these header sizes are defined as ratios to the body size, the header sizes will stay in proportion to the body size, even if the body size is change from `12px`. The header font size calculation is `[body size] * [ratio]`. For example, a body font of `15px` will result in an `H1` header font size of `45px` (`15 * (36 / 12) = 45px`).

### Vertical Rhythm

A [vertical rhythm](http://24ways.org/2006/compose-to-a-vertical-rhythm) means making the spacing of elements consistently align to the baseline grid.

Raster aligns elements to the baseline grid using the following rules:

* All default margins and padding are set to zero by the CSS reset.
* The line height is used as the leading.
* All block level elements are given a bottom margin equal to the leading. (The exception to this is hierarchical sublists, which have a bottom margin of zero, i.e., a list within a list does not have a bottom margin).
* Headers are fitted to the closest matching line height that's a multiple of the leading. For example, if the calculated header height is `21px` and the leading is `17px`, then the line height of the header will be `34px`. (This is in addition to having a bottom margin because headers are also block level elements).

## Layout

Raster's grid approach is to expose Sass variables and functions for positioning elements. In most cases, the `columns-width` and `units-width` functions should be used when specifying widths (and horizontal padding and margins). These functions return the width for an integer count multiplier *while accounting for the gutter space spanning between the specified division size*. For example, to specify an element that spans two columns and is indented two units:

``` css
#sidebar {
	margin-left: units-width(2);
	width: columns-width(2);
}
```

### Semantic Classes

Raster does not expose any classes of its own, allowing HTML authors to choose semantic classes without interfering.

### Grid Functions

These functions are designed to specify the widths of elements that to be laid out on the grid.

* `@function columns-width($num-columns)`: Returns a width equal to the number of columns, while adding space for gutters between columns.
* `@function units-width($num-units)`: Returns a width equal to the number of units, while adding space for gutters between units.

### Grid Variables

While in most cases, it's preferable to use the grid functions to horizontally space elements, it can be useful in some cases to access the widths from the backing Sass variables directly:

* `$gutter-width`: The width of the gutter between columns.
* `$unit-width`: The width of the smallest vertical division, the column is made of up multiples of this.
* `$column-width`: The width of the smallest *usable* vertical division.

Any of these variables can be overridden.

### Calculation Variables

While the grid variables can be overridden directly, a better approach is to use the calculation variables which in turn define the grid variables by default (q.v. `dist/sass/_setup.scss`). The idea is for the `$gutter-width` to be defined based on the font size, and then have all the vertical divisions be defined based on the `$gutter-width`. As a result all the vertical divisions will end up being proportional to the font size of the body text. So the calculation variables allow the sizes of the grid variables to be adjusted (for example, adjusting the `$column-width`), while maintaining the proportional relationship of the body font size to the sizes of the vertical divisions.

* `$num-indent-gutters`: The multiple of `$gutter-width` for indenting hierarchical elements (e.g., `blockquote` and `li`).
* `$num-unit-gutters`: The multiple of `$gutter-width` used to set the `$unit-width`.
* `$num-column-units`: The multiple of `$unit-width` used to set the `$column-width`.

By default, the `$gutter-width` is set to `1rem`, this variable can also be overridden.

### Overriding Variables

To override any of these variables, simply set them before importing `raster.scss`:

``` scss
$num-column-units: 4;
@import "[path to raster]/dist/raster";
```

## Debugging Tools

Raster comes with tools to display the baseline grid, to use them:

1. Import the JavaScript file at `dist/raster.js`:

	``` html
	<script src="[path to raster]/dist/raster.js"></script>
	```

2. Add the class `raster-show-baseline` to the element to show the baseline in (usually the `body` tag):

	``` html
	<body class="raster-show-baseline">
	```

## Tests

Tests can be run by opening the `test-*.html` files in `test/build/html/` in a WebKit browser.

If `mocha-phantomjs` is installed, tests can also be run on the command line with `npm test`. But `phantomjs` doesn't fully simulate the DOM, so it's better to just run the tests this way to debug the tests themselves, and then run the tests in the browser to fully confirm they are passing.

## Resources

* [Compose to a Vertical Rhythm ◆ 24 ways](http://24ways.org/2006/compose-to-a-vertical-rhythm)
* [Five simple steps to better typography - Part 4 | Journal | The Personal Disquiet of Mark Boulton](http://markboulton.co.uk/journal/five-simple-steps-to-better-typography-part-4)
* [Thinking with Type | Contents](http://www.thinkingwithtype.com/contents/grid/)
