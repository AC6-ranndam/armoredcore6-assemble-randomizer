import { writable } from 'svelte/store';

export let option = writable({
    permitExcessArmWeight: false,
    permitExcessLegWeight: false,
    extendedFunctionNonePermit: false,
    armedNonePermit: false,
    hangerWeaponRate: 0,
  });
export let fixedParts = writable({});
export let result = writable([]);
export let parameter = writable([]);
export let limitExcessParameter = writable([]);
export let weaponFormationedParameter = writable([]);