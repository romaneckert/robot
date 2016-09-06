<?php

use Phalcon\Mvc\Controller;

class RobotController extends Controller {

    public function initialize() {
        $this->assets->addCss('css/bootstrap.min.css');
        $this->assets->addCss('css/bootstrap-theme.min.css');
        $this->assets->addCss('css/style.min.css');

        $this->assets->addJs('js/jquery.min.js');
        $this->assets->addJs('js/bootstrap.min.js');
        $this->assets->addJs('js/robot.js');
    }

    public function dashboardAction() {

    }

    public function configurationAction() {

        $this->view->disable();

        $this->response->setContentType('application/json', 'UTF-8');

        echo json_encode($this->config);

    }

    public function updateAction() {

        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);

        // also show stdout errors
        $output = nl2br(trim(shell_exec('git pull 2>&1')));

        $this->view->output = $output;

    }
}