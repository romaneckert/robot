<?php

use Phalcon\Loader;

use Phalcon\Di\FactoryDefault;

use Phalcon\Mvc\Application;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Router;

use Phalcon\Flash\Direct as FlashDirect;

try {

    $loader = new Loader();

    $loader->registerDirs([
        '../app/controllers/',
        '../app/models/'
    ])->register();

    // Create a DI
    $di = new FactoryDefault();

    $config = new Phalcon\Config\Adapter\Json("../config/config.json");
    $di->set('config', $config);

    $view = new View();
    $view->setViewsDir('../app/views/');
    $di->set('view', $view);

    $router = new Router();
    $router->setDefaultController('robot');
    $router->setDefaultAction('dashboard');

    $di->set('router', $router);

    $di->set('flash', new FlashDirect());

    $application = new Application($di);

    $response = $application->handle();
    $response->send();

} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}

