export class Random
{
    static number(max: number, min = 0)
    {
        if (crypto && typeof crypto.getRandomValues === "function")
            return Random.numberWithCSPRG(max, min);
        else
            return Random.numberWithoutCSPRG(max, min);
        
    }
 
    static numberWithCSPRG(max: number, min: number)
    {
        const randomBuffer = new Uint32Array(1);
 
        window.crypto.getRandomValues(randomBuffer);
 
        const randomNumber = randomBuffer[0] / (0xffffffff + 1);
 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(randomNumber * (max - min + 1)) + min;
    }
 
    static numberWithoutCSPRG(max: number, min: number)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
