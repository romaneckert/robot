<?php

use Phalcon\Mvc\Controller;

class RobotController extends Controller {

    public function initialize() {
        $this->assets->addCss('css/bootstrap.min.css');
        $this->assets->addCss('css/bootstrap-theme.min.css');
        $this->assets->addCss('css/style.min.css');

        $this->assets->addJs('js/jquery.min.js');
        $this->assets->addJs('js/bootstrap.min.js');
    }

    public function dashboardAction() {

    }
}