<?php

class EnvUtility {

    public static function getLoad() {
        return round(sys_getloadavg()[0],2);
    }

    public static function countProcesses() {
        return (integer)trim(exec('ps -A | wc -l'));
    }

    public static function getUpTime() {
        return exec("uptime | grep -ohe 'up .*' | sed 's/,//g' | awk '{ print $2}'");
    }

}