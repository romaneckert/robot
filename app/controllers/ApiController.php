<?php

use Phalcon\Mvc\Controller;

class ApiController extends Controller {

    public function dataAction() {
        $this->view->disable();

        $data = [1,2,3];

        $response = new \Phalcon\Http\Response();
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent(json_encode($data));

        return $response;
    }

}


