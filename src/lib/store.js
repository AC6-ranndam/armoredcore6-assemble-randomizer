import { writable } from 'svelte/store';

export let option = writable({
    permitExcessWeight: true,
    extendedFunctionNonePermit: false,
    armedNonePermit: false,
    hangerWeaponRate: 0,
  });
export let fixedParts = writable({});
export let result = writable([]);