<?php

$destDir = "";

if(substr($argv[1], -1) == '\\' || substr($argv[1], -1) == '/') {
    $destDir = substr($argv[1], 0, -1);
} else {
    $destDir = $argv[1];
}

exec("del /S /Q ".$destDir."\assets\*.*", $cmdOutput);

foreach($cmdOutput as $value) { 
    print($value."\r\n");
}

exec("del /Q ".$destDir."\*.*", $cmdOutput);

foreach($cmdOutput as $value) { 
    print($value."\r\n");
}

exec("npx vue-tsc && vite build --outDir ".$destDir, $cmdOutput);

foreach($cmdOutput as $value) { 
    print($value."\r\n");
}
