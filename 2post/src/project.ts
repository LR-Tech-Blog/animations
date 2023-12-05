import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import content_example from './scenes/content_example?scene';
import "./global.css";

export default makeProject({
  scenes: [example, content_example]
});
