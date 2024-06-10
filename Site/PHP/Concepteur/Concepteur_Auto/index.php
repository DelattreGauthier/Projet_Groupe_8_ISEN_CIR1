<?php
$pattern = [
    ['E', 'E', 'E', 'D', 'E', 'E'],
    ['E', 'E', 'E', 'C', 'C', 'E'],
    ['E', 'E', 'E', 'E', 'S', 'E'],
    ['E', 'E', 'E', 'C', 'C', 'E'],
    ['E', 'C', 'S', 'C', 'E', 'E'],
    ['E', 'A', 'E', 'E', 'E', 'E']
];
$road_pattern = [
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0]
];
echo json_encode(['pattern' => $pattern, 'road_pattern' => $road_pattern]);
?>
