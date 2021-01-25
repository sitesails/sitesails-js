import { toMatchShapeOf } from 'jest-to-match-shape-of';
import { KeyValue } from '../src/keyvalues/types';

export const toIncludeSearchStringInKeyValue: jest.CustomMatcher = (
  received: KeyValue,
  expected: string,
) => {
  if (typeof expected !== 'string') {
    throw new Error('Expected searchString to be a string!');
  }

  if (received.key.includes(expected) || received.value.includes(expected))
    return {
      pass: true,
      message: () => `Search results expected to contain '${expected}'`,
    };

  return {
    pass: false,
    message: () => `Search results expected to contain '${expected}':
    result:
    {
      key: ${received.key}
      value: ${received.value}
    }
    `,
  };
};

expect.extend({
  toMatchShapeOf,
});
