import {makeProject} from '@motion-canvas/core';

import client_load from './scenes/client_load?scene';
import content_example from './scenes/content_example?scene';
import "./global.css";

export default makeProject({
  scenes: [client_load, content_example]
});
