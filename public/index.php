<?php

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Router;

try {

    $loader = new Loader();

    $loader->registerDirs([
        '../app/controllers/',
        '../app/models/'
    ])->register();

    // Create a DI
    $di = new FactoryDefault();

    $view = new View();
    $view->setViewsDir('../app/views/');
    $di->set('view', $view);

    $router = new Router();
    $router->setDefaultController('robot');
    $router->setDefaultAction('dashboard');
    $di->set('router', $router);

    $application = new Application($di);

    $response = $application->handle();
    $response->send();

} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}

