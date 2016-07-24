<?php

class MainTask extends \Phalcon\Cli\Task
{
    public function mainAction() {
        echo "\nThis is the default task and the default action \n";
    }

    public function startAction(array $params = []) {

        shell_exec('gpio -g mode 17 out');
        shell_exec('gpio -g write 17 1');

        while(true) {

            shell_exec('gpio -g write 17 1');
            usleep(100);
            shell_exec('gpio -g write 17 0');
            usleep(900);

        }

        shell_exec('gpio -g write 17 0');

        //echo GPIO::clean();
        //echo GPIO::setup(17,GPIO::$out);
        //echo GPIO::output(11,1);

    }
}