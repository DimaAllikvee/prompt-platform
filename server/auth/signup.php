<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../config/db.php'; // здесь создаётся $pdo

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['ok' => false, 'error' => 'Invalid request method']);
        exit;
    }


    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';


    if ($username === '' || $email === '' || $password === '') {
        echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
        exit;
    }


    $stmt = $pdo->prepare('SELECT 1 FROM userdata WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);

    if ($stmt->fetchColumn()) {
        echo json_encode(['ok' => false, 'error' => 'Email already exists']);
        exit;
    }

    
    $insert = $pdo->prepare('INSERT INTO userdata (username, email, password) VALUES (?, ?, ?)');
    $insert->execute([$username, $email, $password]);

    echo json_encode(['ok' => true, 'message' => 'Account created successfully']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Server error']);
}
