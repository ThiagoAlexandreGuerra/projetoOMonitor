export default function precisionDiff(past, now) {

    const diff = {
        objType: "precisionDiff",
        addedChildrens: [],
        removedChildrens: [],
        updatedNodes: []
    };

    compareNode(
        past,
        now,
        diff
    );

    return diff;
}

function compareNode(
    oldNode,
    newNode,
    diff
) {

    if (!oldNode || !newNode) {
        return;
    }

    const nodeId =
        newNode?.id ??
        oldNode?.id ??
        null;

    //-----------------------------------
    // mudanças em propriedades
    //-----------------------------------

    const changes = {};

    compareObjects(
        oldNode.styles,
        newNode.styles,
        changes,
        "styles"
    );

    compareObjects(
        oldNode.property,
        newNode.property,
        changes,
        "property"
    );

    if (
        oldNode.text !== newNode.text
    ) {

        changes.text = {
            oldValue: oldNode.text,
            newValue: newNode.text
        };
    }

    if (
        oldNode.html !== newNode.html
    ) {

        changes.html = {
            oldValue: oldNode.html,
            newValue: newNode.html
        };
    }

    if (
        Object.keys(changes).length > 0
    ) {

        diff.updatedNodes.push({
            nodeId,
            changes
        });

    }

    //-----------------------------------
    // filhos adicionados
    //-----------------------------------

    const oldChildren =
        oldNode.children ?? [];

    const newChildren =
        newNode.children ?? [];

    const oldIds =
        new Set(
            oldChildren.map(
                child => child.id
            )
        );

    const newIds =
        new Set(
            newChildren.map(
                child => child.id
            )
        );

    const addedChildren =
        newChildren.filter(
            child =>
                !oldIds.has(
                    child.id
                )
        );

    if (
        addedChildren.length > 0
    ) {

        diff.addedChildrens.push({

            parentId: nodeId,

            newChildren:
                addedChildren

        });

    }

    //-----------------------------------
    // filhos removidos
    //-----------------------------------

    const removedChildrenIds =
        oldChildren
            .filter(
                child =>
                    !newIds.has(
                        child.id
                    )
            )
            .map(
                child =>
                    child.id
            );

    if (
        removedChildrenIds.length > 0
    ) {

        diff.removedChildrens.push({

            parentId: nodeId,

            removedChildrenIds

        });

    }

    //-----------------------------------
    // recursão
    //-----------------------------------

    const min =
        Math.min(
            oldChildren.length,
            newChildren.length
        );

    for (
        let i = 0;
        i < min;
        i++
    ) {

        compareNode(
            oldChildren[i],
            newChildren[i],
            diff
        );

    }
}

function compareObjects(
    oldObj = {},
    newObj = {},
    changes,
    category
) {

    const delta = {};

    const keys =
        new Set([

            ...Object.keys(
                oldObj
            ),

            ...Object.keys(
                newObj
            )

        ]);

    keys.forEach(key => {

        if (
            oldObj[key] !==
            newObj[key]
        ) {

            delta[key] = {

                oldValue:
                    oldObj[key],

                newValue:
                    newObj[key]

            };

        }

    });

    if (
        Object.keys(delta).length > 0
    ) {

        changes[
            category
        ] = delta;

    }
}