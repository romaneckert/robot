<?php

/**
 * Class EnvUtility
 */
class EnvUtility {

    /**
     * @return float
     */
    public static function getLoadAverage() {
        return round(sys_getloadavg()[0],2);
    }

    /**
     * @return int
     */
    public static function countProcesses() {
        return (integer)trim(exec('ps -A | wc -l'));
    }

    /**
     * @return string
     */
    public static function getUpTime() {
        return exec("uptime | grep -ohe 'up .*' | sed 's/,//g' | awk '{ print $2}'");
    }

}