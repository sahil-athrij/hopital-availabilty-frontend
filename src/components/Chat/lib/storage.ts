import localForage from "localforage";

const IGNORE_KEY = ["rid"];
const BACKEND = localForage;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const $ = $ || null;

export class Storage
{
    private readonly hooks: Record<string, unknown>;
    private name?: string;

    static async clear(name: string)
    {
        for (const key in BACKEND)
        {
            if (!BACKEND.hasOwnProperty(key))
                continue;

            if (key.startsWith(name))
                await BACKEND.removeItem(key);
        }
    }

    constructor()
    {
        this.hooks = {};
    }

    getName()
    {
        return this.name;
    }

    generateKey(...args: [])
    {
        return args.join("");
    }

    getPrefix()
    {
        return this.name || "";
    }

    getBackend()
    {
        return BACKEND;
    }

    async setItem(...args: unknown[])
    {
        let key, value;

        if (args.length === 2) 
        {
            key = args[0];
            value = args[1];
        }
        else if (args.length === 3) 
        {
            key = String(args[0]) + args[1];
            value = args[2];
        }

        const pre_key = this.getPrefix() + key;
        const oldValue = BACKEND.getItem(pre_key);

        await BACKEND.setItem(pre_key, value);


        this.onStorageEvent({
            key: pre_key,
            oldValue: oldValue,
            newValue: value
        } as unknown as StorageEvent);

    }

    async getItem(...args: string[])
    {
        let key;

        if (args.length === 1)

            key = args[0];

        else if (arguments.length === 2)

            key = String(args[0]) + args[1];

        key = this.getPrefix() + key;

        return BACKEND.getItem(key);
    }

    async removeItem(...args: string[])
    {
        let key;

        if (args.length === 1)

            key = args[0];

        else if (args.length === 2)

            key = String(args[0]) + args[1];

        await BACKEND.removeItem(this.getPrefix() + key);
    }

    async increment(key: string)
    {
        const value = Number(this.getItem(key));

        await this.setItem(key, String(value + 1));
    }

    async removeElement(...args: unknown[]) 
    {
        let key, name: unknown;

        if (args.length === 2) 
        {
            key = args[0];
            name = args[1];
        }
        else if (args.length === 3) 
        {
            key = String(args[0]) + args[1];
            name = args[2];
        }

        let item = await this.getItem(<string>key);

        if ($.isArray(item))

            item = $.grep(item, (e: unknown) => e !== name);

        else if (typeof (item) === "object" && item !== null)
            delete (item as Record<string, unknown>)[name as string];

        await this.setItem(<string>key, item);
    }

    removeHook(eventName: string | number, func: string)
    {
        let eventNameList = (this.hooks || {})[eventName] || [];

        if (typeof func === "undefined")
            eventNameList = [];

        else if ((eventNameList as Array<string>).indexOf(func) > -1)

            eventNameList = $.grep(eventNameList, function (i: string)
            {
                return func !== i;
            });

        (this.hooks || {})[eventName] = eventNameList;
    }

    onStorageEvent = (ev: StorageEvent) =>
    {
        const hooks = this.hooks;
        const key = ev.key?.replace(new RegExp("^" + this.getPrefix()), "");
        const oldValue = ev.oldValue;
        const newValue = ev.newValue;

        if (IGNORE_KEY.indexOf(<string>key) > -1)
            return;

        const eventNames = Object.keys(hooks || {});
        eventNames.forEach(function (eventName)
        {
            if (key?.match(new RegExp("^" + eventName + "(:.+)?$")) && hooks)
            {
                const eventNameHooks = <Array<(newValue: string, oldValue:string, key:string) => unknown>>hooks[eventName] || [];
                eventNameHooks.forEach(function (hook)
                {
                    hook(newValue || "", oldValue || "", key);
                });
            }
        });
    };
}
