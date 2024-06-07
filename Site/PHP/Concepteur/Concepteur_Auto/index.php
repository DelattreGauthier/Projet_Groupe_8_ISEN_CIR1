<?php
$pattern = [
    ['E', 'E', 'E', 'E', 'D', 'E', 'E', 'E'],
    ['E', 'C', 'S', 'S', 'C', 'E', 'E', 'E'],
    ['E', 'S', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'S', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'S', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'S', 'E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'C', 'S', 'S', 'S', 'C', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'A', 'E', 'E']
];
$road_pattern = [
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0]
];
echo json_encode(['pattern' => $pattern, 'road_pattern' => $road_pattern]);
?>
