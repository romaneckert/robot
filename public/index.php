<?php

use Phalcon\Loader;

use Phalcon\Di\FactoryDefault;

use Phalcon\Mvc\Application;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Router;
use Phalcon\Tag;

try {

    define('ROOT', dirname(__DIR__) . '/');

    $loader = new Loader();

    $loader->registerDirs([
        '../app/controllers/',
        '../app/models/',
        '../app/utilities'
    ])->register();

    // Create a DI
    $di = new FactoryDefault();

    $config = new Phalcon\Config\Adapter\Json("../config/config.json");
    $di->set('config', $config);

    $view = new View();
    $view->setViewsDir('../app/views/');
    $di->set('view', $view);

    $tag = new Tag();
    $di->set('tag', $tag);

    $router = new Router();
    $router->setDefaultController('robot');
    $router->setDefaultAction('dashboard');

    $router->add(
        '/api/data',
        [
            'controller' => 'api',
            'action' => 'data'
        ]
    );

    $di->set('router', $router);

    $application = new Application($di);

    $response = $application->handle();
    $response->send();

} catch (\Exception $e) {
    echo "Exception: ", $e->getMessage();
}

