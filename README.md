### `useClearedMemo(getFn, clearFn, deps)`

[![Stable Release](https://img.shields.io/npm/v/use-cleared-memo.svg)](https://npm.im/use-cleared-memo)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/use-cleared-memo)
[![gzip size](http://img.badgesize.io/https://unpkg.com/use-cleared-memo@latest/dist/use-cleared-memo.umd.production.min.js?compression=gzip)](https://unpkg.com/use-cleared-memo@latest/dist/use-cleared-memo.umd.production.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

There are cases where you need to use memoized values that needs to be cleared on unmount and when dependencies change. For that purpose, I present you `useClearedMemo`:

```typescript
  React.useMemo(getFn, deps)
+ React.useEffect(() => clearFn, deps)

= useClearedMemo(getFn, clearFn, deps)
```

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/use-cleared-memo/blob/master/LICENSE)
