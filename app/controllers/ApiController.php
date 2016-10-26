<?php

use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    /**
     * @return \Phalcon\Http\Response|\Phalcon\Http\ResponseInterface
     */
    public function dataAction() {

        // disable view in json api
        $this->view->disable();

        // get system information
        $data['system'] = [];
        $data['system']['loadAverage'] = SystemUtility::getLoadAverage();
        $data['system']['processes'] = SystemUtility::countProcesses();
        $data['system']['upTime'] = SystemUtility::getUpTime();

        // get global config
        $data['config'] = $this->config;

        // set content type to json
        $this->response->setContentType('application/json', 'UTF-8');

        // encode json data
        $this->response->setContent(json_encode($data));

        return $this->response;
    }

}


