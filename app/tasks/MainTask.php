<?php

class MainTask extends \Phalcon\Cli\Task
{
    public function mainAction() {
        echo "\nThis is the default task and the default action \n";
    }

    /**
     * @param array $params
     */
    public function testAction(array $params) {
        echo sprintf('hello %s', $params[0]) . PHP_EOL;
        echo sprintf('best regards, %s', $params[1]) . PHP_EOL;

        while(true) {
            echo __DIR__;

            shell_exec('python ' . __DIR__.'/../python/gpio.py test');
        }
    }
}