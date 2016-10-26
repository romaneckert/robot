<?php

use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    public function dataAction() {
        $this->view->disable();

        $data['system'] = [];
        $data['system']['load'] = EnvUtility::getLoad();
        $data['system']['processes'] = EnvUtility::countProcesses();
        $data['system']['uptime'] = EnvUtility::getUpTime();

        $data['config'] = $this->config;

        $this->response->setContentType('application/json', 'UTF-8');
        $this->response->setContent(json_encode($data));

        return $this->response;
    }

}


