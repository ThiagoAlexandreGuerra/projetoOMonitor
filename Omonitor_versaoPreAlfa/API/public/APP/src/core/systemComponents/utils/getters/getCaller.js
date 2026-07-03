/**
 * Returns information about the function that called getCaller().
 *
 * @returns {{
 *     name: string | null,
 *     fn: Function | null,
 *     raw: string | null
 * }}
 */
export default function getCaller() {

    // ---------- Stack based ----------
    try {

        const stack = new Error().stack;

        if (typeof stack === "string") {

            const lines = stack
                .split("\n")
                .map(line => line.trim())
                .filter(Boolean);

            /*
                Typical stacks:

                Chrome / Edge / Opera
                Error
                at getCaller (...)
                at parent (...)

                Firefox
                getCaller@...
                parent@...
            */

            let callerLine = null;

            // Chrome / Edge / Opera
            const chromeStyle = lines.filter(
                line => line.startsWith("at ")
            );

            if (chromeStyle.length >= 3) {
                callerLine = chromeStyle[2];
            }

            // Firefox
            if (!callerLine) {

                const firefoxStyle = lines.filter(
                    line => line.includes("@")
                );

                if (firefoxStyle.length >= 2) {
                    callerLine = firefoxStyle[1];
                }
            }

            if (callerLine) {

                let name = null;

                // Chrome style
                let match =
                    callerLine.match(/^at\s+(.+?)\s+\(/);

                // Firefox style
                if (!match) {
                    match = callerLine.match(/^(.+?)@/);
                }

                if (match) {
                    name = match[1];
                }

                return {
                    name,
                    fn: null,
                    raw: callerLine
                };
            }
        }

    } catch (error) {
        // ignore
    }


    // ---------- arguments.callee.caller ----------
    try {

        // Must not be in strict mode
        const fn = arguments.callee.caller;

        if (typeof fn === "function") {

            return {
                name: fn.name || null,
                fn,
                raw: fn.toString()
            };
        }

    } catch (error) {
        // ignore
    }


    // ---------- getCaller.caller ----------
    try {

        const fn = getCaller.caller;

        if (typeof fn === "function") {

            return {
                name: fn.name || null,
                fn,
                raw: fn.toString()
            };
        }

    } catch (error) {
        // ignore
    }


    return {
        name: null,
        fn: null,
        raw: null
    };
}