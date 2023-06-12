import { error } from "@sveltejs/kit"
import { spawn, execSync } from "child_process"
import type EventEmitter from "node:events"
export type CustomEmmiter = EventEmitter & { notify: () => void }
export enum CLIReturnType {
    JSON,
    TABLE
}
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
export function initializeResource(resource: string, namespace = "", resourceName = ""): any {
    const cmd = `kubectl get ${resource} ${resourceName} -o=json ${namespace === "" ? " -A " : ` -n=${namespace} `}`
    return initializeResourceString(cmd, CLIReturnType.JSON)
    try {

        const res = execSync(`kubectl get ${resource} ${resourceName} -o=json ${namespace === "" ? " -A " : ` -n=${namespace} `}`, { 'shell': 'powershell.exe' })
        const resJson = JSON.parse(res.toString())
        return resJson.items
    } catch (e: any) {
        throw error(400, {
            message: e.message,
        })
    }

}
export function initializeResourceString(cmd: string, type: CLIReturnType): any {
    try {
        const res = execSync(cmd, { 'shell': 'powershell.exe' })
        const resJson = convertCLIResToData(res, type)  //JSON.parse(res.toString())
        return resJson
    } catch (e: any) {
        throw error(400, {
            message: e.message,
        })
    }

}
function convertCLIResToData(data: Buffer, type: CLIReturnType = CLIReturnType.TABLE): any {
    try {
        if (type === CLIReturnType.JSON) {
            return JSON.parse(data.toString()).items
        } else if (type === CLIReturnType.TABLE) {
            return tableToJSON(data.toString())
        }
    } catch (e: any) {
        return tableToJSON(data.toString())
    }

}
export function watchResource(resource: string, send_objs: (objs: any) => void, namespace = "", resourceName = "") {
    const argArr = ["get",
        resource]
    if (resourceName !== "") {
        argArr.push(resourceName)
    }
    argArr.push("-o=json")
    argArr.push(namespace === "" ? "-A" : `-n=${namespace}`)
    argArr.push("-w")
    const cmd = spawn("kubectl", argArr, { 'shell': 'powershell.exe' })
    cmd.stdout.on('data', function (data) {
        data = execSync(`kubectl get ${resource} ${resourceName} -o=json ${namespace === "" ? "-A" : `-n=${namespace}`}`, { 'shell': 'powershell.exe' })
        const json = JSON.parse(data.toString())
        send_objs(json.items)
    });
    cmd.stderr.on('data', function (data) {
    });
    cmd.on('exit', function (code) {
    })
}