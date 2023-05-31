import { spawn, execSync } from "child_process"
import type EventEmitter from "node:events"
export type CustomEmmiter = EventEmitter & { notify: () => void }
export function tableToJSON(tbl: string): any[] {
    const lines = tbl.split("\n")
    const headers = lines[0].split(" ").filter(x => x != "")
    const data = lines.slice(1).map(x => x.split("  ").filter(x => x != ""))
    const retArr = data.map(x => {
        const obj: any = {}
        for (let i = 0; i < headers.length; i++) {
            obj[headers[i]] = x[i]
        }
        return obj
    })
    retArr.pop();
    return retArr
}
export function initializeResource(resource: string, allNamespaces = false): any[] {
    const res = execSync(`kubectl get ${resource} ${allNamespaces ? "-A" : ""}`, { 'shell': 'powershell.exe' })
    const resJson = tableToJSON(res.toString())
    return resJson
}
export function watchResource(resource: string, send_objs: (objs: any[]) => void, allNamespaces = false) {
    const cmd = spawn("kubectl", ["get", resource, allNamespaces ? "-A" : "", "-w"], { 'shell': 'powershell.exe' })
    cmd.stdout.on('data', function (data) {
        data = execSync(`kubectl get ${resource} ${allNamespaces ? "-A" : ""}`, { 'shell': 'powershell.exe' })
        const json: any[] = tableToJSON(data.toString())
        send_objs(json)
    });
}