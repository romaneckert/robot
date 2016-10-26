<?php

use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    public function dataAction() {
        $this->view->disable();

        $data['system'] = [];
        $data['system']['load'] = round(sys_getloadavg()[0],2);
        $data['system']['processes'] = (integer)trim(exec('ps -A | wc -l'));

        $response = new \Phalcon\Http\Response();
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($data));

        return $response;
    }

}


