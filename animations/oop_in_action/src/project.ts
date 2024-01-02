import {makeProject} from '@motion-canvas/core';

import class_object from './scenes/class_object?scene';
import abstraction from './scenes/abstraction?scene';
import encapsulation from './scenes/encapsulation?scene';

export default makeProject({
  scenes: [class_object, abstraction, encapsulation],
  variables: {
    "darkMode": false,
  }
});
