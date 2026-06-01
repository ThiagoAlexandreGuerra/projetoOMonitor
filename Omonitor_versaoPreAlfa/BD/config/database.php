<?php

require_once __DIR__ . '/../bootstrap.php';

use Cycle\Database\DatabaseManager;
use Cycle\Database\Config;

return new DatabaseManager(new Config\DatabaseConfig([
    'databases' => [
        'default' => [
            'driver' => 'runtime',
        ],
    ],
    'connections' => [
        'runtime' => new Config\SQLiteDriverConfig(
            connection: new Config\SQLite\FileConnectionConfig(
                database: __DIR__ . '/../runtime/database.sqlite'
            ),
            queryCache: true,
        ),
    ],
]));
