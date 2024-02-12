import {makeProject} from '@motion-canvas/core';

import classAsType from './scenes/class-as-type?scene';

export default makeProject({
  scenes: [classAsType],
  variables: {
    darkMode: false,
  },
});
