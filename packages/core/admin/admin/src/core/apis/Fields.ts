/* eslint-disable check-file/filename-naming-convention */

import * as React from 'react';

import invariant from 'invariant';

export type Field = {
  type: string;
  Component: React.ComponentType<any>;
};

class Fields {
  fields: Record<typeof Fields.name, Field>;

  constructor() {
    this.fields = {};
  }

  add(field: Field) {
    const { type, Component } = field;

    invariant(Component, 'A Component must be provided');
    invariant(type, 'A type must be provided');

    this.fields[type] = Component;
  }
}

export default () => new Fields();
