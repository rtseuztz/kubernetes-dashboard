import type { PodJSON, NameSpaceJSON, ServiceJSON } from "src/app";
import { writable } from "svelte/store";

export const namespaces = writable<NameSpaceJSON[]>();
export const pods = writable<PodJSON[]>();
export const services = writable<ServiceJSON[]>();