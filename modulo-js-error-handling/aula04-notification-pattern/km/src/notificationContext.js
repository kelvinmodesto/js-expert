export default class NotificationContext {
  constructor() {
    this.notifications = [];
  }

  hasNotifications() {
    return this.notifications.length > 0;
  }

  addNotification(notication) {
    this.notifications.push(notication);
  }
}
