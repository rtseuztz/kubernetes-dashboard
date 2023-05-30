// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };

export interface NameSpace {
	NAME: string;
	STATUS: string;
	AGE: string;
}
export interface Pod {
	NAMESPACE: string;
	NAME: string;
	READY: string;
	STATUS: string;
	RESTARTS: string;
	AGE: string;
}
