const PREFIX = "jsxc2";
const SEP = ":";
const IGNORE_KEY = ["rid"];
const BACKEND = localStorage;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const $ = $ || null;

export class Storage
{
    private readonly hooks?: Record<string, unknown>;
    private static tested?: boolean;
    static storageNotConform: boolean;
    private static toSNC: undefined;
    private name?: string;

    static clear(name: string)
    {
        let prefix = PREFIX + SEP;

        if (prefix)
            prefix = prefix + name + SEP;

        for (const key in BACKEND)
        {
            if (!BACKEND.hasOwnProperty(key))
                continue;

            if (key.startsWith(prefix))
                BACKEND.removeItem(key);
        }
    }

    constructor()
    {
        this.hooks = {};

        if (Storage.tested === undefined)
        {
            Storage.tested = false;
            Storage.storageNotConform = false;
            Storage.toSNC = undefined;
        }

        if (!Storage.tested)
        {
            Storage.tested = true;

            this.testStorage();
        }

        window.addEventListener("storage", this.onStorageEvent, false);

    }

    getName()
    {
        return this.name;
    }

    generateKey(...args: [])
    {
        let key = "";

        args.forEach(function (arg)
        {
            if (key !== "")

                key += SEP;

            key += arg;
        });

        return key;
    }

    testStorage()
    {
        const randomNumber = Math.round(Math.random() * 1000000000) + "";
        const key = this.getPrefix() + randomNumber;

        const listenerFunction = function (ev: StorageEvent)
        {
            if (ev.newValue === randomNumber)
            {
                clearTimeout(timeout);
                cleanup();
                Storage.storageNotConform = true;
            }
        };

        const cleanup = function ()
        {
            window.removeEventListener("storage", listenerFunction, false);
            BACKEND.removeItem(key);
        };

        window.addEventListener("storage", listenerFunction, false);

        const timeout = setTimeout(function ()
        {
            cleanup();
        }, 20);

        BACKEND.setItem(key, randomNumber);
    }

    getPrefix()
    {
        let prefix = PREFIX + SEP;

        if (this.name)
            prefix += this.name + SEP;

        return prefix;
    }

    getBackend()
    {
        return BACKEND;
    }

    setItem(...args: unknown[])
    {
        let key, value;

        if (args.length === 2)
        {
            key = args[0];
            value = args[1];
        }
        else if (args.length === 3)
        {
            key = args[0] + SEP + args[1];
            value = args[2];
        }

        //@REVIEW why do we just stringify objects?
        if (typeof (value) === "object")

            // exclude jquery objects, because otherwise safari will fail
            try
            {
                value = JSON.stringify(value, function (key, val)
                {
                    return val;
                });
            }
            catch (err)
            {
                console.warn("Could not stringify value", err);
            }

        const pre_key = this.getPrefix() + key;
        const oldValue = BACKEND.getItem(pre_key);

        BACKEND.setItem(pre_key, String(value || ""));

        if (!Storage.storageNotConform && oldValue !== value)
            this.onStorageEvent({
                key: pre_key,
                oldValue: oldValue,
                newValue: value
            } as unknown as StorageEvent);

    }

    getItem(...args: string[])
    {
        let key;

        if (args.length === 1)

            key = args[0];

        else if (arguments.length === 2)

            key = args[0] + SEP + args[1];

        key = this.getPrefix() + key;

        return this.parseValue(BACKEND.getItem(key));
    }

    removeItem(...args: string[])
    {
        let key;

        if (args.length === 1)

            key = args[0];

        else if (args.length === 2)

            key = args[0] + SEP + args[1];

        BACKEND.removeItem(this.getPrefix() + key);
    }

    updateItem(...args: string[])
    {
        let key, variable, value; // TODO Call me if you get an error, or don't

        if (args.length === 4 || (args.length === 3 && typeof variable === "object"))
        {
            key = args[0] + SEP + args[1];
            variable = args[2];
            value = args[3];
        }
        else
        {
            key = args[0];
            variable = args[1];
            value = args[2];
        }

        const data = this.getItem(key) || {};

        if (typeof (variable) === "object") // TODO: I don't know what I am doing
            $.each(variable, (key: string | number, val: unknown) => data[key] = val);
        else
            data[variable] = value;

        this.setItem(key, data);
    }

    increment(key: string)
    {
        const value = Number(this.getItem(key));

        this.setItem(key, String(value + 1));
    }

    removeElement(...args: unknown[])
    {
        let key, name: unknown;

        if (args.length === 2)
        {
            key = args[0];
            name = args[1];
        }
        else if (args.length === 3)
        {
            key = args[0] + SEP + args[1];
            name = args[2];
        }

        let item = this.getItem(<string>key);

        if ($.isArray(item))

            item = $.grep(item, (e: unknown) => e !== name);

        else if (typeof (item) === "object" && item !== null)
            delete item[name as string];

        this.setItem(<string>key, item);
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
        const oldValue = this.parseValue(ev.oldValue);
        const newValue = this.parseValue(ev.newValue);

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
                    hook(newValue, oldValue, key);
                });
            }
        });
    };

    parseValue(value: string | null)
    {
        try
        {
            return JSON.parse(<string>value);
        }
        catch (e)
        {
            return value;
        }
    }
}
