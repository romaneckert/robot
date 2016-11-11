<?php

use Phalcon\Mvc\Controller;

class RobotController extends Controller {

    public function initialize() {
        $this->assets->addCss('css/style.min.css');
        $this->assets->addJs('js/robot.min.js');
    }

    public function dashboardAction() {

    }

    public function dataAction() {

        $this->view->disable();

        $this->response->setContentType('application/json', 'UTF-8');

        $data = [];

        $data['config'] = $this->config;

        $handle = fopen(ROOT.'logs/log.log','r');

        if(false !== $handle) {
            $counter = 0;
            $logs = [];

            while (!feof($handle)) {

                $line = fgets($handle);
                $parts = explode(' ', $line);
                $date = array_shift($parts);
                $time = array_shift($parts);
                $message = trim(implode(' ', $parts));

                $logs[] = [$date, $time, $message];

                $counter++;

                if($counter > 200) break;
            }

            fclose($handle);

            $data['logs'] = $logs;
        }

        $data['env'] = [];
        $data['env']['load'] = round(sys_getloadavg()[0],2);

        echo json_encode($data);

    }

    public function updateAction() {

        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);

        // also show stdout errors
        $output = nl2br(trim(shell_exec('git pull 2>&1')));

        $this->view->output = $output;

    }
}