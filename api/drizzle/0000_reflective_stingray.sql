CREATE TABLE `authors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`praenomen` text,
	`nomen` text,
	`cognomen` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authors_code_unique` ON `authors` (`code`);