// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const registration = self.registration;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addEventListener("install", self.skipWaiting);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addEventListener("notificationclick", ({action, notification}) => handleClick(action, notification));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addEventListener("push", ({data}) => handlePush(JSON.parse(data.text())));

async function handleClick(action: string, notification: { data: { url: string, token: string }; })
{
    switch(action)
    {
    case "open":
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        self.clients.openWindow(notification.data.url);
        break;
    case "reject": // TODO A real url would be nice
        await fetch(process.env.BASE_URL+"/please/stop/calling?token="+notification.data.token)
            .catch(console.error);
        break;
    }
}

async function handlePush({image, token, name}: {image: string, token: string, name: string})
{
    if(await registration.pushManager.getSubscription())
        await registration.showNotification("Incoming Call",
            {
                image,
                body: `${name} calling...`,
                vibrate: [100, 50, 300, 50],
                requireInteraction: true,
                data: {url: `/video_call/${token}`, token},
                actions: [{title: "Accept", action: "open"}, {title: "Reject", action: "reject"}]
            });
}

export {};
