import { Api } from "../client/Api"
import { CreateDeviceDto, DeviceDto } from "../client/data-contracts";
import { NotificationService } from "./NotificationService";

export class ApiService {
    private api: Api; 

    constructor(private notificationService: NotificationService) {
        this.api = new Api({
            baseUrl: ""
        });
    }

    async getDevices() {
        try {
            return (await this.api.deviceGet()).data
        } catch (error) {
            this.notificationService.addNotification("Unable to connect", "danger");
            return [];
        }
    }

    async createDevice(device: CreateDeviceDto){
        try {
            return (await this.api.deviceCreate(device)).data;
        } catch (error) {
            this.notificationService.addNotification("Unable to create", "danger");
            throw error;
        }
    }

    async deleteDevice(device: DeviceDto, password: string) {
        try {
            await this.api.deviceDelete(device.id, {
                password: password
            });
        } catch (error) {
            this.notificationService.addNotification("Unable to delete", "danger");
        }
    }

    async wakeDevice(device: DeviceDto, password: string) {
        try {
            await this.api.deviceWake(device.id, {
                password: password
            })
        } catch (error) {
            this.notificationService.addNotification("Unable to wake", "danger");
            return [];
        }
    }

    async isDeviceOn(device: DeviceDto) {
        try {
            return (await this.api.deviceIsDeviceOn(device.id)).data;
        } catch (error) {
            this.notificationService.addNotification("Unable to ping", "danger");
            return false;
        }
    }
}