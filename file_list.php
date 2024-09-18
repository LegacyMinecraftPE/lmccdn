<?php
$type = isset($_GET['type']) ? $_GET['type'] : '';
$directory = 'filesarchive/' . $type;

if ($type && is_dir($directory)) {
    $files = array_diff(scandir($directory), ['.', '..']);
    echo json_encode(array_values($files));
} else {
    echo json_encode([]);
}
?>