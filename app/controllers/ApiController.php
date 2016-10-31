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

        // encode json data
        $this->response->setJsonContent($data);

        return $this->response;
    }

}


