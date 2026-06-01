<?php

require_once __DIR__ . '/bootstrap.php';

use Cycle\Annotated;
use Cycle\Annotated\Locator\TokenizerEmbeddingLocator;
use Cycle\Annotated\Locator\TokenizerEntityLocator;
use Cycle\Database;
use Cycle\Database\Config;
use Cycle\Schema;
use Spiral\Tokenizer;

$dbal = new Database\DatabaseManager(new Config\DatabaseConfig([
    'databases' => [
        'default' => [
            'driver' => 'runtime',
        ],
    ],
    'connections' => [
        'runtime' => new Config\SQLiteDriverConfig(
            connection: new Config\SQLite\FileConnectionConfig(
                database: __DIR__ . '/runtime/database.sqlite'
            ),
            queryCache: true,
        ),
    ],
]));

$classLocator = (new Tokenizer\Tokenizer(new Tokenizer\Config\TokenizerConfig([
    'directories' => [
        __DIR__ . '/src',
    ],
])))->classLocator();

$schema = (new Schema\Compiler())->compile(new Schema\Registry($dbal), [
    new Schema\Generator\ResetTables(),

    new Annotated\Embeddings(new TokenizerEmbeddingLocator($classLocator)),
    new Annotated\Entities(new TokenizerEntityLocator($classLocator)),

    new Annotated\TableInheritance(),
    new Annotated\MergeColumns(),

    new Schema\Generator\GenerateRelations(),
    new Schema\Generator\GenerateModifiers(),
    new Schema\Generator\ValidateEntities(),
    new Schema\Generator\RenderTables(),
    new Annotated\MergeIndexes(),
    new Schema\Generator\RenderRelations(),
    new Schema\Generator\RenderModifiers(),
    new Schema\Generator\ForeignKeys(),

    new Schema\Generator\GenerateTypecast(),

    // Cria/atualiza as tabelas no SQLite
    new Schema\Generator\SyncTables(),
]);

echo "Tabelas SQLite sincronizadas com sucesso.\n";
