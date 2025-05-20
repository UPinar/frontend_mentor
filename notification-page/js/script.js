/* --------------------------------------------- */

const markAllNotificationItemsAsRead = () => {
  const notificationItems = document.querySelectorAll(".notification-item");
  notificationItems.forEach((item) => {
    item.classList.remove("non-read-notification");
  });

  const NotificationCount = document.querySelector(".notification-count");

  NotificationCount.innerText = 0;

  const NotificationTextRedBlock = document.querySelectorAll(
    ".notification-text .red-block"
  );

  NotificationTextRedBlock.forEach((block) => {
    block.remove();
  });
};

const markAllAsReadButton = document.querySelector(
  ".notification-mark-as-read"
);
markAllAsReadButton.addEventListener("click", markAllNotificationItemsAsRead);

/* --------------------------------------------- */
