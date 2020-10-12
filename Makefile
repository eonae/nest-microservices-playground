start-app:
	nest start -p units/apps/hybrid-app/tsconfig.build.json -w
produce-commands:
	nest start -p units/apps/command-producer/tsconfig.build.json -w

produce-events:
	nest start -p units/apps/event-producer/tsconfig.build.json