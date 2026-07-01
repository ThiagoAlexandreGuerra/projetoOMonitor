export default function diffObjects(past, now) {

    // console.clear()
    // console.log(`past:  `);
    // console.log(past);
    // console.log(`Now:   `);
    // console.log(now);
    const changes = [];

    compare(
        past,
        now,
        "root",
        null
    );

    return changes;

    function compare(
        oldNode,
        newNode,
        path,
        currentNodeId
    ) {

        const nodeId =
            newNode?.id ??
            oldNode?.id ??
            currentNodeId;

            
        if (newNode === undefined) {

            changes.push({
                type: "REMOVED",
                nodeId,
                path,
                oldValue: oldNode,
                newValue: undefined
            });

            return;
        }

        if (oldNode === undefined) {

            changes.push({
                type: "ADDED",
                nodeId,
                path,
                oldValue: undefined,
                newValue: newNode
            });

            return;
        }

        if (typeof oldNode !== typeof newNode) {

            changes.push({
                type: "TYPE_CHANGED",
                nodeId,
                path,
                oldValue: oldNode,
                newValue: newNode
            });

            return;
        }

        if (
            typeof oldNode !== "object" ||
            oldNode === null ||
            newNode === null
        ) {

            if (oldNode !== newNode) {

                const info =
                    extractPropertyInfo(path);

                changes.push({
                    type: "VALUE_CHANGED",
                    nodeId,
                    path,

                    category:
                        info.category,

                    property:
                        info.property,

                    oldValue: oldNode,
                    newValue: newNode
                });
            }

            return;
        }

        if (
            Array.isArray(oldNode) &&
            Array.isArray(newNode)
        ) {

            const max =
                Math.max(
                    oldNode.length,
                    newNode.length
                );

            for (
                let i = 0;
                i < max;
                i++
            ) {

                compare(
                    oldNode[i],
                    newNode[i],
                    `${path}[${i}]`,
                    nodeId
                );
            }

            return;
        }

        const keys = new Set([
            ...Object.keys(oldNode),
            ...Object.keys(newNode)
        ]);

        for (const key of keys) {

            compare(
                oldNode[key],
                newNode[key],
                `${path}.${key}`,
                nodeId
            );
        }
    }

    function extractPropertyInfo(path) {

        const parts =
            path.split(".");

        const stylesIndex =
            parts.indexOf("styles");

        const propertyIndex =
            parts.indexOf("property");

        if (stylesIndex !== -1) {

            return {

                category:
                    "styles",

                property:
                    parts[
                        stylesIndex + 1
                    ] || null
            };
        }

        if (propertyIndex !== -1) {

            return {

                category:
                    "property",

                property:
                    parts[
                        propertyIndex + 1
                    ] || null
            };
        }

        if (
            path.includes(
                "elementFunctions"
            )
        ) {

            return {

                category:
                    "event",

                property:
                    "elementFunctions"
            };
        }

        return {

            category:
                "generic",

            property:
                parts.at(-1)
        };
    }
}