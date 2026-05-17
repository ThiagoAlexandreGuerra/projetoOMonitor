<?php

$uri = $_SERVER['PATH_INFO'] ?? null;

require_once  'path.php';

define('CONTROLLERS' , getControllerPath());
define('COMPONENTS' ,   getComponentsPath());
define('FUNCTIONS' , getFunctionsPath());
define('PAGES' , getPagesPath());
define('PUBLIC' , getPublicPath());

var_dump(CONTROLLERS);