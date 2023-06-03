import PodsTable from "../../src/routes/pods/pods-table.svelte";
describe('Pods.cy.ts', () => {
  it('loads in the pod', () => {
    cy.mount(PodsTable, {
      props: {
        pods: [{
          "apiVersion": "v1",
          "kind": "Pod",
          "metadata": {
            "creationTimestamp": "2023-05-31T14:27:12Z",
            "labels": {
              "run1": "nginx",
              "run2": "nginx"
            },
            "name": "nginx",
            "namespace": "default",
            "resourceVersion": "79112",
            "uid": "2ec94917-dc10-4636-ad20-7fd38d74634a"
          },
          "spec": {
            "containers": [
              {
                "image": "nginx:latest",
                "imagePullPolicy": "Always",
                "name": "nginx",
                "resources": {},
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "volumeMounts": [
                  {
                    "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                    "name": "kube-api-access-ldgmp",
                    "readOnly": true
                  }
                ]
              }
            ],
            "dnsPolicy": "ClusterFirst",
            "enableServiceLinks": true,
            "nodeName": "minikube",
            "preemptionPolicy": "PreemptLowerPriority",
            "priority": 0,
            "restartPolicy": "Always",
            "schedulerName": "default-scheduler",
            "securityContext": {},
            "serviceAccount": "default",
            "serviceAccountName": "default",
            "terminationGracePeriodSeconds": 30,
            "tolerations": [
              {
                "effect": "NoExecute",
                "key": "node.kubernetes.io/not-ready",
                "operator": "Exists",
                "tolerationSeconds": 300
              },
              {
                "effect": "NoExecute",
                "key": "node.kubernetes.io/unreachable",
                "operator": "Exists",
                "tolerationSeconds": 300
              }
            ],
            "volumes": [
              {
                "name": "kube-api-access-ldgmp",
                "projected": {
                  "defaultMode": 420,
                  "sources": [
                    {
                      "serviceAccountToken": {
                        "expirationSeconds": 3607,
                        "path": "token"
                      }
                    },
                    {
                      "configMap": {
                        "items": [
                          {
                            "key": "ca.crt",
                            "path": "ca.crt"
                          }
                        ],
                        "name": "kube-root-ca.crt"
                      }
                    },
                    {
                      "downwardAPI": {
                        "items": [
                          {
                            "fieldRef": {
                              "apiVersion": "v1",
                              "fieldPath": "metadata.namespace"
                            },
                            "path": "namespace"
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          },
          "status": {
            "conditions": [
              {
                "lastProbeTime": null,
                "lastTransitionTime": "2023-05-31T14:27:12Z",
                "status": "True",
                "type": "Initialized"
              },
              {
                "lastProbeTime": null,
                "lastTransitionTime": "2023-06-02T18:21:21Z",
                "status": "True",
                "type": "Ready"
              },
              {
                "lastProbeTime": null,
                "lastTransitionTime": "2023-06-02T18:21:21Z",
                "status": "True",
                "type": "ContainersReady"
              },
              {
                "lastProbeTime": null,
                "lastTransitionTime": "2023-05-31T14:27:12Z",
                "status": "True",
                "type": "PodScheduled"
              }
            ],
            "containerStatuses": [
              {
                "containerID": "docker://7863b54b8ee99304313557818bf178a12e85751cca997d7eb7d83bf5670c8ce5",
                "image": "nginx:latest",
                "imageID": "docker-pullable://nginx@sha256:af296b188c7b7df99ba960ca614439c99cb7cf252ed7bbc23e90cfda59092305",
                "lastState": {
                  "terminated": {
                    "containerID": "docker://e36a3013225126df12c4ec9cef75e8bdc960613695c5e37be50d5ab7d991068d",
                    "exitCode": 255,
                    "finishedAt": "2023-06-02T18:20:56Z",
                    "reason": "Error",
                    "startedAt": "2023-06-02T00:30:00Z"
                  }
                },
                "name": "nginx",
                "ready": true,
                "restartCount": 2,
                "started": true,
                "state": {
                  "running": {
                    "startedAt": "2023-06-02T18:21:21Z"
                  }
                }
              }
            ],
            "hostIP": "192.168.67.2",
            "phase": "Running",
            "podIP": "10.244.0.17",
            "podIPs": [
              {
                "ip": "10.244.0.17"
              }
            ],
            "qosClass": "BestEffort",
            "startTime": "2023-05-31T14:27:12Z"
          }
        }]
      }
    })
    cy.get('table tr').should('have.length', 2)
  })
})
