<?php

require_once __DIR__ . '/../bootstrap.php';

use App\Entity\Usuario;
use App\Repository\UsuarioRepositorio;

$orm = require __DIR__ . '/../config/orm.php';
$usuarioRepositorio = new UsuarioRepositorio($orm);

$usuario = new Usuario();
$usuario->username = 'joao.silva';
$usuario->email = 'joao.silva@example.com';
$usuario->senha_hash = password_hash('123456', PASSWORD_BCRYPT);
$usuario->nome_completo = 'Joao Silva';

$usuarioRepositorio->salvar($usuario);
echo "Usuario criado com ID {$usuario->id}\n";

$encontrado = $usuarioRepositorio->buscarPorEmail('joao.silva@example.com');
if ($encontrado !== null) {
    echo "Usuario encontrado: {$encontrado->nome_completo}\n";
}

$usuario->nome_completo = 'Joao da Silva';
$usuarioRepositorio->salvar($usuario);
echo "Usuario atualizado.\n";

$usuarioRepositorio->remover($usuario);
echo "Usuario removido.\n";
