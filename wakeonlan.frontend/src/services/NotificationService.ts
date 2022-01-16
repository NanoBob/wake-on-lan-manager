export interface Notification
{
    text: string;
    type: string;
}

type NotificationCallback = (notifications: Notification[]) => void;

export class NotificationService {
    private notifications: Notification[]; 
    private callbacks: NotificationCallback[];

    constructor() {
        this.notifications = [];
        this.callbacks = [];
    }
    
    
    addNotification(text: string, type: string) {
        this.notifications.push({
            text: text,
            type: type
        });

        setTimeout(this.removeNotification.bind(this), 4000);
        for (const callback of this.callbacks)
            callback(this.notifications);
    }

    removeNotification() {
        this.notifications.shift();
        for (const callback of this.callbacks)
            callback(this.notifications);
    }

    registerCallback(callback: NotificationCallback) {
        this.callbacks.push(callback);
        callback(this.notifications);
    }
}