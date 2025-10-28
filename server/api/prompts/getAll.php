<?php
header('Content-Type: application/json; charset=utf-8');


require __DIR__ . '/../../config/db.php';


$stmt = $pdo->query("SELECT * FROM prompts ORDER BY created_at DESC");
$rows = $stmt->fetchAll();


foreach ($rows as &$row) {
  if (isset($row['tags'])) {
    $row['tags'] = $row['tags'] ? json_decode($row['tags'], true) : [];
  }
}

echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
