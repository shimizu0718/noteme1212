<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json');
require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid request payload.']);
    exit;
}

$username = trim((string)($input['username'] ?? ''));
$password = (string)($input['password'] ?? '');
$loginAs  = ($input['loginAs'] ?? 'customer') === 'admin' ? 'admin' : 'customer';

if ($username === '' || $password === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter both username and password.']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, username, name, email, password_hash, role FROM users WHERE username = :username LIMIT 1');
$stmt->execute(['username' => $username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'message' => 'Incorrect username or password.']);
    exit;
}

if ($user['role'] !== $loginAs) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'message' => "This account does not have {$loginAs} access."]);
    exit;
}

session_regenerate_id(true);
$_SESSION['user'] = [
    'id'       => (int)$user['id'],
    'username' => $user['username'],
    'name'     => $user['name'],
    'email'    => $user['email'],
    'role'     => $user['role'],
];

echo json_encode(['ok' => true, 'user' => $_SESSION['user']]);