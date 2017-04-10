import localforage from 'localforage'
let ls = localforage.createInstance({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'nvduoc.senviet.org',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'nvduoc_senviet_org', // Should be alphanumeric, with underscores.
  description: 'nvduoc blog storage'
})
export default ls
