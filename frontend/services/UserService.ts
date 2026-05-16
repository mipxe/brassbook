import {IUser}from "../models/response/IUser"
import {AxiosResponse} from "axios"
import { AuthResponse } from "../models/response/AuthResponse"
import $api from "../http"

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users')
    }
}
