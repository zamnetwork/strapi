/* eslint-disable check-file/filename-naming-convention */
import * as React from 'react';

import invariant from 'invariant';

type Component = {
  name: string;
  Component: React.ComponentType<any>;
};

class Components {
  components: Record<typeof Components.name, Component>;

  constructor() {
    this.components = {};
  }

  add(component: Component) {
    const { name, Component } = component;

    invariant(Component, 'A Component must be provided');
    invariant(name, 'A name must be provided');
    invariant(this.components[name] === undefined, 'A similar field already exists');

    this.components[name] = Component;
  }
}

export default () => new Components();
