import { renderHook } from '@testing-library/react-hooks';

import { useClearedMemo } from '../src/useClearedMemo';

describe('useCleardMemo', () => {
  test('clears on unmount', () => {
    let clearIndex = 0;

    const { unmount, rerender } = renderHook(() =>
      useClearedMemo(
        () => ({
          clear: () => {
            clearIndex++;
          },
        }),
        ({ clear }) => clear(),
      ),
    );

    expect(clearIndex).toBe(0);
    unmount();
    expect(clearIndex).toBe(1);
    rerender();
    expect(clearIndex).toBe(1);
  });

  test('clears on change deps', () => {
    let clearIndex = 0;

    const { unmount, rerender } = renderHook(({ dep = 0 }) =>
      useClearedMemo(
        () => ({
          clear: () => {
            clearIndex++;
          },
        }),
        ({ clear }) => clear(),
        [dep],
      ),
    );

    expect(clearIndex).toBe(0);
    rerender({ dep: 0 });
    expect(clearIndex).toBe(0);
    rerender({ dep: 1 });
    expect(clearIndex).toBe(1);
    unmount();
    expect(clearIndex).toBe(2);
  });
});
