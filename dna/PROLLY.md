# Prolly Tree — SYM map, not a physics claim

Probabilistic B-tree. Coined by Noms. Dolt stores table rows in one.

Build, bottom up:

1. Sort key-value pairs.
2. Content-defined chunking. A rolling hash cuts a boundary when it falls under a threshold. Average block about 4 KB. Dolt targets a truncated Weibull for chunk size.
3. Hash each chunk. That hash is the address.
4. Next layer: last key of each chunk plus that chunk's address.
5. Repeat until one root.

Properties: read like a B-tree, diff in time proportional to the change, structural sharing because identical hashes are stored once. History-independent: same keys give the same root regardless of insert order.

A write copies the path to the root. Unchanged siblings stay. That is the additive-fusion image.

Status: EST as a data structure used by Dolt. Not a physical dimension.
