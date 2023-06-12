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


export interface PodJSON {
	apiVersion: string
	kind: string
	metadata: Metadata
	spec: Spec
	status: Status
}

export interface Metadata {
	creationTimestamp: string
	labels: { [key: string]: string }

	name: string
	namespace: string
	resourceVersion: string
	uid: string
}


export interface Spec {
	containers: Container[]
	dnsPolicy: string
	enableServiceLinks: boolean
	nodeName: string
	preemptionPolicy: string
	priority: number
	restartPolicy: string
	schedulerName: string
	securityContext: SecurityContext
	serviceAccount: string
	serviceAccountName: string
	terminationGracePeriodSeconds: number
	tolerations: Toleration[]
	volumes: Volume[]
}

export interface Container {
	image: string
	imagePullPolicy: string
	name: string
	resources: Resources
	terminationMessagePath: string
	terminationMessagePolicy: string
	volumeMounts: VolumeMount[]
}

export interface Resources { }

export interface VolumeMount {
	mountPath: string
	name: string
	readOnly: boolean
}

export interface SecurityContext { }

export interface Toleration {
	effect: string
	key: string
	operator: string
	tolerationSeconds: number
}

export interface Volume {
	name: string
	projected: Projected
}

export interface Projected {
	defaultMode: number
	sources: Source[]
}

export interface Source {
	serviceAccountToken?: ServiceAccountToken
	configMap?: ConfigMap
	downwardAPI?: DownwardApi
}

export interface ServiceAccountToken {
	expirationSeconds: number
	path: string
}

export interface ConfigMap {
	items: Item[]
	name: string
}

export interface Item {
	key: string
	path: string
}

export interface DownwardApi {
	items: Item2[]
}

export interface Item2 {
	fieldRef: FieldRef
	path: string
}

export interface FieldRef {
	apiVersion: string
	fieldPath: string
}

export interface Status {
	conditions: Condition[]
	containerStatuses: ContainerStatuse[]
	hostIP: string
	phase: string
	podIP: string
	podIPs: PodIp[]
	qosClass: string
	startTime: string
}

export interface Condition {
	lastProbeTime: any
	lastTransitionTime: string
	status: string
	type: string
}

export interface ContainerStatuse {
	containerID: string
	image: string
	imageID: string
	lastState: LastState
	name: string
	ready: boolean
	restartCount: number
	started: boolean
	state: State
}

export interface LastState { }

export interface State {
	running: Running
}

export interface Running {
	startedAt: string
}

export interface PodIp {
	ip: string
}


// namespacces 



export interface NameSpaceJSON {
	apiVersion: string
	kind: string
	metadata: Metadata
	spec: Spec
	status: Status
}

export interface Metadata {
	creationTimestamp: string
	labels: Labels
	name: string
	resourceVersion: string
	uid: string
}

export interface Labels {
	"kubernetes.io/metadata.name": string
}

export interface Spec {
	finalizers?: string[]
}

export interface Status {
	phase: string
}

export interface ContextTbl {
	NAME: string
	CURRENT: string
	CLUSTER: string
	AUTHINFO: string

}

export interface ServiceJSON {
	apiVersion: string
	items: Item[]
	kind: string
	metadata: Metadata2
}

export interface Item {
	apiVersion: string
	kind: string
	metadata: Metadata
	spec: Spec
	status: Status
}

export interface Metadata {
	creationTimestamp: string
	labels: Labels
	name: string
	namespace: string
	resourceVersion: string
	uid: string
}

export interface Labels {
	component: string
	provider: string
}

export interface Spec {
	clusterIP: string
	clusterIPs: string[]
	internalTrafficPolicy: string
	ipFamilies: string[]
	ipFamilyPolicy: string
	ports: Port[]
	sessionAffinity: string
	type: string
}

export interface Port {
	name: string
	port: number
	protocol: string
	targetPort: number
}

export interface Status {
	loadBalancer: LoadBalancer
}

export interface LoadBalancer { }

export interface Metadata2 {
	resourceVersion: string
}
