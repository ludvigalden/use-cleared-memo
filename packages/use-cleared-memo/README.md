[![Stable Release](https://img.shields.io/npm/v/use-cleared-memo.svg)](https://npm.im/use-cleared-memo)
[![Types Included](https://badgen.net/npm/types/use-cleared-memo)](https://npm.im/use-cleared-memo)
[![GZip Size](https://badgen.net/bundlephobia/minzip/use-cleared-mempo)](https://npm.im/use-cleared-memo)
[![Treeshaking](https://badgen.net/bundlephobia/tree-shaking/use-cleared-memo)](https://npm.im/use-cleared-memo)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/use-cleared-memo)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

Are you building a hook or functional React component that needs to predictably clear and/or hydrate memoized values in an easy-to-use way? Opportunities are almost endless; no matter if you're subscribing to external state, initializing timers or intervals, or creating a new instance of some object every time deps change that eventually needs to be deconstructed, `useClearedMemo` will be there for you to do the job.

<a name="useClearedMemo"></a>

## useClearedMemo(getFn, clearFn, deps, clearFnDeps) ⇒ <code>T</code>
<p>Allows for clearing a memoized value when dependencies change as well as on unmount. The code
below is a simplified version of the functionality, which omits the critical fact that the
<em>every value that has been retrieved will be cleared before the next one is retrieved <strong>or</strong> when the component unmounts</em>.
That means every retrieved value will be cleared, and only once. The most obvious use-case for this is creating subscriptions,
which either just needs to get unsubscribed on unmount or hydrated when a new subscription should be created (based on the deps).</p>
<pre class="prettyprint source lang-typescript"><code> React.useMemo(() => {
   clearFn(value);
   return getFn();
 }, deps);
+ React.useEffect(() => clearFn, deps);
≈ useClearedMemo(getFn, clearFn, deps);
</code></pre>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| getFn | <code>function</code> | <p>Returns the memoized value that is to be cleared.</p> |
| clearFn | <code>function</code> | <p>Clears the previously memoized value when the component unmounts or the deps change.</p> |
| deps | <code>ReadonlyArray</code> | <p>Identities that the <code>getFn</code> depends on. When changed, the previously memoized value will be cleared and the <code>getFn</code> will be called to retrieve the new value.</p> |
| clearFnDeps | <code>ReadonlyArray</code> | <p>Identities that the <code>clearFn</code> depends on.</p> |


## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/use-cleared-memo/blob/master/LICENSE)
