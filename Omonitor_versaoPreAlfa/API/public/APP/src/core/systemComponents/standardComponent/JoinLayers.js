import { StorageLayer       } from "./StorageLayer.js";
import { IndetifyLayer      } from "./IndetifyLayer.js";
import { HeritageLayer      } from "./HeritageLayer.js";
import { PermissionLayer    } from "./PermissionLayer.js";
import { StyleLayer         } from "./StyleLayer.js";

class Base {}

const compose = (...mixins) =>
    mixins.reduce(
        (base, mixin) => mixin(base),
        Base
    );

export default class JoinLayers extends compose(
    HeritageLayer,
    IndetifyLayer,
    PermissionLayer,
    StorageLayer,
    StyleLayer
) {

    constructor() {

        super();

    }
}