const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder();

function bufferConcat(...args: ArrayBuffer[])
{
    let length = 0;
    let buffer = null;

    for (const i in args)
    {
        buffer = args[i];
        length += buffer.byteLength;
    }

    const joined = new Uint8Array(length);
    let offset = 0;

    for (const i in args)
    {
        buffer = args[i];
        joined.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
    }

    return joined.buffer;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Use a lookup table to find the index.
const lookup = new Uint8Array(256);
for (let i = 0; i < chars.length; i++)
    lookup[chars.charCodeAt(i)] = i;

class Base64ArrayBuffer
{

    static encode(arraybuffer: ArrayBuffer)
    {
        const bytes = new Uint8Array(arraybuffer), len = bytes.length;
        let i, base64 = "";

        for (i = 0; i < len; i += 3)
        {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += chars[bytes[i + 2] & 63];
        }

        if ((len % 3) === 2)

            base64 = base64.substring(0, base64.length - 1) + "=";

        else if (len % 3 === 1)

            base64 = base64.substring(0, base64.length - 2) + "==";

        return base64;
    }

    static decode(base64: string)
    {
        const len = base64.length;
        let bufferLength = base64.length * 0.75, i, p = 0, encoded1, encoded2, encoded3, encoded4;

        if (base64[base64.length - 1] === "=")
        {
            bufferLength--;
            if (base64[base64.length - 2] === "=")

                bufferLength--;

        }

        const arraybuffer = new ArrayBuffer(bufferLength),
            bytes = new Uint8Array(arraybuffer);

        for (i = 0; i < len; i += 4)
        {
            encoded1 = lookup[base64.charCodeAt(i)];
            encoded2 = lookup[base64.charCodeAt(i + 1)];
            encoded3 = lookup[base64.charCodeAt(i + 2)];
            encoded4 = lookup[base64.charCodeAt(i + 3)];

            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }

        return arraybuffer;
    }
}

export class ArrayBufferUtils
{
    static concat(a: ArrayBuffer, b: ArrayBuffer)
    {
        return bufferConcat(a, b);
    }

    static decode(a?: BufferSource)
    {
        return decoder.decode(a);
    }

    static encode(s?: string)
    {
        return encoder.encode(s); //@REVIEW returns Uint8Array  
    }

    static toBase64(a?: ArrayBuffer)
    {
        return a ? Base64ArrayBuffer.encode(a) : "";
    }

    static fromBase64(s: string)
    {
        return Base64ArrayBuffer.decode(s);
    }

    static toString(thing: unknown)
    {
        if (typeof thing === "string")

            return thing;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new dcodeIO.ByteBuffer.wrap(thing).toString("binary");
    }

    static isEqual(a?: ArrayBuffer | string, b?: ArrayBuffer | string)
    {
        // TODO: Special-case arraybuffers, etc
        if (a === undefined || b === undefined)

            return false;

        const as = ArrayBufferUtils.toString(a);
        const bs = ArrayBufferUtils.toString(b);

        const maxLength = Math.max(as.length, bs.length);
        if (maxLength < 5)

            throw new Error("a/b compare too short");

        return as.substring(0, Math.min(maxLength, as.length)) === bs.substring(0, Math.min(maxLength, bs.length));
    }

    static toArray(a: ArrayBuffer)
    {
        return Array.apply([], new Uint8Array(a) as unknown as unknown[]);
    }

    static fromArray(a: ArrayBuffer)
    {
        return new Uint8Array(a).buffer;
    }
}
