import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

/**
 * Minimal configuration for Sheriff
 * Assigns the 'noTag' tag to all modules and
 * allows all modules to depend on each other.
 */

export const config: SheriffConfig = {
  enableBarrelLess: true,
  modules: {
    'src/app/domains/<domain>/feature-<name>': ['domain:<domain>', 'type:feature'],
    'src/app/domains/<domain>/ui-<name>': ['domain:<domain>', 'type:ui'],
    'src/app/domains/<domain>/data': ['domain:<domain>', 'type:data'],
    'src/app/domains/<domain>/util-<name>': ['domain:<domain>', 'type:util'],
  },
  depRules: {
    root: '*',
    'domain:*': [sameTag, 'domain:shared'],
    'type:feature': ['type:ui', 'type:data', 'type:util'],
    'type:ui': ['type:data', 'type:util', 'type:ui'],
    'type:data': ['type:util'],
    'type:util': [],
  },
};
