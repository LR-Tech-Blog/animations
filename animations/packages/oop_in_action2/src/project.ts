import {makeProject} from '@motion-canvas/core';

import classAsType from './scenes/class-as-type?scene';
import animalTree from './scenes/animal-tree?scene';

export default makeProject({
  scenes: [classAsType, animalTree],
  variables: {
    darkMode: false,
  },
});
