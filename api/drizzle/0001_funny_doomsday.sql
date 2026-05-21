CREATE TABLE `languages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number` integer NOT NULL,
	`text` text NOT NULL,
	`locus` text NOT NULL,
	`opus_id` integer,
	FOREIGN KEY (`opus_id`) REFERENCES `opera`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `opera` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`title` text NOT NULL,
	`language_id` integer,
	`author_id` integer,
	FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE no action
);
