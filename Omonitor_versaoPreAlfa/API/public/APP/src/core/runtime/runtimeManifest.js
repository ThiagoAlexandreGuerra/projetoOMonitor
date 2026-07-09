const RUNTIME_MANIFEST = [

    /* ===========================
       MAIN
    =========================== */

    "/core/main/main.js",

    /* ===========================
       ANIMATION
    =========================== */

    

    /* ===========================
       INTERFACE
    =========================== */

    "/core/interface/HomeController.js",
    "/core/interface/HomeModel.js",

    /* ===========================
       LAYOUT
    =========================== */

    "/core/layoutHandler/ExecutionBlock/ExecutionBlock.js",
    "/core/layoutHandler/LayoutCoordinator/LayoutCoordinator.js",

    /* ===========================
       NAVIGATION
    =========================== */

    "/core/navigation/domElementNavigator/Navigation.js",

    /* ===========================
       PWA
    =========================== */

    "/core/PWA/main/PWA.js",

    "/core/PWA/data/Cache/CacheManager.js",

    "/core/PWA/data/compactor/compactorString.js",

    "/core/PWA/data/compactor/pako/dist/pako.mjs",

    "/core/PWA/data/imageStorage/main/ImageStorage.js",

    "/core/PWA/data/indexDB/IDB.js",
    "/core/PWA/data/indexDB/IDBS.js",

    "/core/PWA/src/installRoutine/AppInstallButton.js",
    "/core/PWA/src/installRoutine/installApp.js",

    /* ===========================
       RENDER
    =========================== */

    "/core/render/main/render.js",

    "/core/render/renderCheck/isComponentInDom.js",
    "/core/render/renderCheck/observeComponent.js",
    "/core/render/renderCheck/waitComponent.js",

    "/core/render/renders/CreateAndRenderElement.js",
    "/core/render/renders/instantRenderer.js",
    "/core/render/renders/renderComponentUpdate.js",
    "/core/render/renders/renderDiff.js",
    "/core/render/renders/renderTreeObject.js",
    "/core/render/renders/renderUpdate.js",

    "/core/render/renders/createElement/createElement.js",

    /* ===========================
       SYSTEM COMPONENTS
    =========================== */

    "/core/systemComponents/componentFunctions/animations/rotate.js",

    "/core/systemComponents/componentFunctions/componentsF/boxes/enableAddEventListener.js",
    "/core/systemComponents/componentFunctions/componentsF/boxes/enableDragging.js",
    "/core/systemComponents/componentFunctions/componentsF/boxes/EnableVisibility.js",

    "/core/systemComponents/componentFunctions/componentsF/button/enableFunctions.js",
    "/core/systemComponents/componentFunctions/componentsF/button/hover.js",
    "/core/systemComponents/componentFunctions/componentsF/button/joinClickEventButtonFunctions.js",
    "/core/systemComponents/componentFunctions/componentsF/button/joinStandardButtonFunctions.js",

    "/core/systemComponents/componentFunctions/componentsF/clock/time.js",

    "/core/systemComponents/componentFunctions/wrapComponent/wrap.js",
    "/core/systemComponents/componentFunctions/wrapComponent/enables/enableBehaviorFunctions.js",
    "/core/systemComponents/componentFunctions/wrapComponent/enables/enableElementMethods.js",
    "/core/systemComponents/componentFunctions/wrapComponent/enables/enableStandardComponentFunctions.js",

    "/core/systemComponents/componentIdentify/componentId/getId.js",

    "/core/systemComponents/components/anchor/Anchor.js",
    "/core/systemComponents/components/anchorlinks/AnchorLinkHorizontal.js",

    "/core/systemComponents/components/boxes/BoxWithChildBoxes.js",
    "/core/systemComponents/components/boxes/ContentContainer.js",
    "/core/systemComponents/components/boxes/PACKGE.js",
    "/core/systemComponents/components/boxes/StandardBox.js",
    "/core/systemComponents/components/boxes/VirtualBody.js",

    "/core/systemComponents/components/buttons/AnchorButton.js",
    "/core/systemComponents/components/buttons/ClickEventButton.js",
    "/core/systemComponents/components/buttons/NextToLoginButton.js",
    "/core/systemComponents/components/buttons/StandardButton.js",

    "/core/systemComponents/components/circles/StandardCircle.js",
    "/core/systemComponents/components/favicon/Favicon.js",
    "/core/systemComponents/components/grid/GridLayout.js",
    "/core/systemComponents/components/paragraph/Paragraph.js",
    "/core/systemComponents/components/sidebar/Sidebar.js",
    "/core/systemComponents/components/slide/Slide.js",
    "/core/systemComponents/components/span/Span.js",
    "/core/systemComponents/components/text/Text.js",
    "/core/systemComponents/components/text/TextWithAnchors.js",
    "/core/systemComponents/components/title/Title.js",

    "/core/systemComponents/standardComponent/HeritageLayer.js",
    "/core/systemComponents/standardComponent/IndetifyLayer.js",
    "/core/systemComponents/standardComponent/JoinLayers.js",
    "/core/systemComponents/standardComponent/JoinStylesGetersAndSetersToAssembly.js",
    "/core/systemComponents/standardComponent/PermissionLayer.js",
    "/core/systemComponents/standardComponent/StorageLayer.js",
    "/core/systemComponents/standardComponent/StyleController.js",
    "/core/systemComponents/standardComponent/StyleLayer.js",

    "/core/systemComponents/standardComponent/isValid/lists.js",

    "/core/systemComponents/standardComponent/main/StandardComponent.js",

    "/core/systemComponents/utils/auto/autoDisplay.js",

    "/core/systemComponents/utils/getters/getCaller.js",
    "/core/systemComponents/utils/getters/getDOMElement.js",

    "/core/systemComponents/utils/styles/adjustColorIntensity.js",
    "/core/systemComponents/utils/styles/colorToHex.js",

    "/core/systemComponents/utils/text/ExternalFonts.js",
    "/core/systemComponents/utils/text/externalFontsLinks.js",
    "/core/systemComponents/utils/text/TextEditingFunction.js",

    /* ===========================
       CORE UTILS
    =========================== */

    "/core/utils/behavior/elementOff.js",
    "/core/utils/behavior/elementOn.js",
    "/core/utils/behavior/fullscreen.js",
    "/core/utils/behavior/toggleVisibility.js",

    "/core/utils/inspect/FunctionAnalyzer.js",
    "/core/utils/inspect/inspectFunction.js",

    "/core/utils/inspect/AST/ASTWalker/ASTWalker.js",
    "/core/utils/inspect/AST/main/AST.js",

    "/core/utils/tools/addLinksToDOM.js",
    "/core/utils/tools/cleanDOM.js",
    "/core/utils/tools/CleanDOMElements.js",
    "/core/utils/tools/cleanDOMElementsById.js",
    "/core/utils/tools/GetPath.js",
    "/core/utils/tools/removeLinksFromDOM.js",

    /* ===========================
       VIRTUAL DOM
    =========================== */

    "/core/virtualDOM/createVirtualNode/createVirtualNode.js",

    "/core/virtualDOM/functionHandlers/createFunctionsMap.js",
    "/core/virtualDOM/functionHandlers/removeFunctionReferences.js",

    "/core/virtualDOM/getDOM/DOMToObject.js",

    "/core/virtualDOM/main/virtualDom.js",

    "/core/virtualDOM/utils/objectUtils/appendChildToThis.js",
    "/core/virtualDOM/utils/objectUtils/convertElementToObject.js",
    "/core/virtualDOM/utils/objectUtils/diffObjects.js",
    "/core/virtualDOM/utils/objectUtils/findNodesByPrefix.js",
    "/core/virtualDOM/utils/objectUtils/precisionDiff.js",
    "/core/virtualDOM/utils/objectUtils/removeNodeById.js",

    "/core/virtualDOM/utils/registry/registry.js",

    "/core/virtualDOM/utils/replacement/replaceObjectById.js",

    "/core/virtualDOM/utils/search/findById.js",
    "/core/virtualDOM/utils/search/findByTag.js",
    "/core/virtualDOM/utils/search/findNode.js"

];

export default RUNTIME_MANIFEST;