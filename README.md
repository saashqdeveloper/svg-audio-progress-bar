# SVG Audio Progress bar using Greensock GSAP

> Custom SVG path audio progressbar using [GSAP](https://greensock.com/gsap)

## Main

```text
src/
├── audioProgessbar.js
```

## Getting started

### Installation

In browser:

```html
<script src="assets/vendor/gsap/gsap.min.js"></script>
<script src="assets/vendor/gsap/Draggable.min.js"></script>
<script src="assets/vendor/gsap/MotionPathPlugin.min.js"></script>
<script src="src/audioProgressbar.js"></script>
```

### Usage

#### Syntax

```js
audioProgressbar.init("audio-container", "podcast-audio", "#curve", "#dot");
```

- **audio-container**

  - The target id of the audio container.

- **podcast-audio**

  - The target id of audio tag

- **#curve**

  - The target id of progressbar

- **#dot**
  - The target id of timer dot

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## License

[MIT](https://opensource.org/licenses/MIT)
