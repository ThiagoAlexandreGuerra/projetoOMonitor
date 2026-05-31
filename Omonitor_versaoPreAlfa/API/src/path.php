<?php

function getPath(string $folder): string{

    return realpath(__DIR__) . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR;
    
}

function getComponentsPath(){
    return getPath("components");
}

function getControllerPath(){
    return getPath("controller");
}

function getFunctionsPath(){
    return getPath("functions");
}

function getPagesPath(){
    return getPath("pages");
}

function getPublicPath(){
    return getPath("public");
}
