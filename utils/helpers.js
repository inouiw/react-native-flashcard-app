import { Notifications, Permissions } from 'expo'
import { removeUserNotificationPreference, getDidUserAllowNofifications, saveDidUserAllowNofifications } from './dataAccess'

export function clearLocalNotification() {
  return removeUserNotificationPreference()
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'Make a quiz!',
    body: "don't forget to complete a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  getDidUserAllowNofifications()
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              saveDidUserAllowNofifications(true)
            }
          })
      }
    })
}