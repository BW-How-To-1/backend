exports.up = function(knex) {
	return knex.schema
		.createTable('projects', (tbl) => {
			tbl.increments();
			tbl.string('title', 128).notNullable();
			tbl.string('bodyText', 128).notNullable();
			tbl.string('image', 255);
			tbl.string('likes', 128);
			tbl.string('author', 128).notNullable();
			tbl.date('date');
		})
		.createTable('comments', (tbl) => {
			tbl.increments();
			tbl.string('comments');
			tbl
				.integer('projects_id')
				.notNullable()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('projects').dropTableIfExists('comments');
};
