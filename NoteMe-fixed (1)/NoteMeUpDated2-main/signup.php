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
$name     = trim((string)($input['name'] ?? ''));
$age      = (int)($input['age'] ?? 0);
$email    = trim((string)($input['email'] ?? ''));
$address  = trim((string)($input['address'] ?? ''));
$password = (string)($input['password'] ?? '');

if ($username === '' || $name === '' || $age < 1 || !filter_var($email, FILTER_VALIDATE_EMAIL) || $address === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please fill in all fields with valid information.']);
    exit;
}

if (strlen($password) <= 5) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Password must be more than 5 characters.']);
    exit;
}

// Check if username or email already exists
$stmt = $pdo->prepare('SELECT id FROM users WHERE username = :username OR email = :email LIMIT 1');
$stmt->execute(['username' => $username, 'email' => $email]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['ok' => false, 'message' => 'That username or email is already registered. Log in or use different details.']);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$insert = $pdo->prepare(
    'INSERT INTO users (username, name, age, email, address, password_hash, role)
     VALUES (:username, :name, :age, :email, :address, :password_hash, :role)'
);
$insert->execute([
    'username'      => $username,
    'name'          => $name,
    'age'           => $age,
    'email'         => $email,
    'address'       => $address,
    'password_hash' => $passwordHash,
    'role'          => 'customer',
]);

session_regenerate_id(true);
$_SESSION['user'] = [
    'id'       => (int)$pdo->lastInsertId(),
    'username' => $username,
    'name'     => $name,
    'email'    => $email,
    'role'     => 'customer',
];

echo json_encode(['ok' => true, 'user' => $_SESSION['user']]);