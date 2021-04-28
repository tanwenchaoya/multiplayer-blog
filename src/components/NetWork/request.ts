import { requestConfig, PublishMessage,PageConfig } from './requestConfig'
export function getnotedetail(path:string) {
    return requestConfig(path)
}
export function PostMessage(path:string,data:any) {
    return PublishMessage(path,data)
}
export function PageSizeChange(path:string,parmas:any) {
    return PageConfig(path,parmas)
}