import NotificationContext from './notificationContext.js';

export default class PirateEntity extends NotificationContext {
  constructor({ name, age }) {
    super();

    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.age < 17) {
      this.addNotification('age must be higher than 16');
    }

    if (this.name.length > 3) {
      this.addNotification('name length must be higher than 3');
    }

    return !this.hasNotifications();
  }
}
