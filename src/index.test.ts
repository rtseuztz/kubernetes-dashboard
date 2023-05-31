import { describe, it, expect } from 'vitest';
import { tableToJSON } from './script';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('tableToJSON test', () => {
	it('converts a table to json', () => {
		const tbl = `NAME                 STATUS   AGE
default              Active   2d
kube-node-lease      Active   2d
kube-public          Active   2d
kube-system          Active   2d
kubernetes-dashboard   Active   2d
`
		const json = tableToJSON(tbl)
		expect(json).toEqual([
			{ NAME: 'default', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kube-node-lease', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kube-public', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kube-system', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kubernetes-dashboard', STATUS: 'Active', AGE: '2d' }
		])
	});
	it('converts a table to json with spaces in values', () => {
		const tbl = `NAME                 STATUS   AGE
default              Active   2 d
kube-node-lease      Active   2d
kube-public          Active   2d
kube-system          Active   2d
kubernetes-dashboard   Active   2d
`
		const json = tableToJSON(tbl)
		expect(json).toEqual([
			{ NAME: 'default', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kube-node-lease', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kube-public', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kube-system', STATUS: 'Active', AGE: '2d' },
			{ NAME: 'kubernetes-dashboard', STATUS: 'Active', AGE: '2d' }
		])
	});
	//test an empty table
	it('converts an empty table to json', () => {
		const tbl = `NAME                 STATUS   AGE
`
		const json = tableToJSON(tbl)
		expect(json).toEqual([])
	});

});

