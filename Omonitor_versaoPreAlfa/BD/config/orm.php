<?php

use Cycle\Annotated;
use Cycle\Annotated\Locator\TokenizerEmbeddingLocator;
use Cycle\Annotated\Locator\TokenizerEntityLocator;
use Cycle\Database;
use Cycle\Database\Config;
use Cycle\ORM;
use Cycle\Schema;
use Spiral\Tokenizer;

require_once __DIR__ . '/../bootstrap.php';

$dbal = new Database\DatabaseManager(new Config\DatabaseConfig([
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

$classLocator = (new Tokenizer\Tokenizer(new Tokenizer\Config\TokenizerConfig([
    'directories' => [
        __DIR__ . '/../src',
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

    // FIXME: Usar SyncTables apenas no desenvolvimento, alterar em produção.
    new Schema\Generator\SyncTables(),

    new Schema\Generator\GenerateTypecast(),
]);

return new ORM\ORM(
    new ORM\Factory($dbal),
    new ORM\Schema($schema)
);
