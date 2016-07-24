<?php

class GPIO {

    public static $out = 0;
    public static $in = 1;
    public static $board = 10;
    public static $bcm = 11;

    public static function clean() {

        return self::sendCommand('clean');

    }

    public static function setup($channel, $direction) {

        return self::sendCommand('setup '.$channel.' '.$direction);

    }

    public static function output($channel, $state) {

        return self::sendCommand('output '.$channel.' '.$state);

    }

    private function sendCommand($params) {
        return shell_exec('python ' . __DIR__.'/gpio.py '.$params);
    }

}